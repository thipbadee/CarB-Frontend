'use client'
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { CreateBooking } from "../../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";

export default function Reservations () {

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const model = urlParams.get('model')

    const [message, setMessage] = useState<string>('');
    const { data: session } = useSession();
    const [isClicked, setIsClicked] = useState(false);

    const dispatch = useDispatch<AppDispatch>()

    const makeReservation = async () => {

        setIsClicked(true);
        
        if (!model) {
            window.alert("Please select a model first!");
            window.location.href = "/car";
            return;
        }
        if(cid && pickupDate) {
            const item:CreateBooking = {
                bookingDate: dayjs(pickupDate).format("YYYY-MM-DD"),
                // user: session.user.token,
                car: cid,
                createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ")
            }
            // dispatch(addReservation(item))
        }

        try {
            const dateValue = pickupDate; // Declare the dateValue variable and assign it the value of pickupDate
            if (!dateValue) {
                alert('Please select a date');
                return;
            }
            const response = await fetch(`http://localhost:5000/api/v1/bookings/${cid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: JSON.stringify({
                    bookingDate: dateValue?.format('YYYY-MM-DD')
                })
            });

            // if (!response.ok) {
            //     alert('Cannot book this car on this day');
            //     throw new Error('Booking failed');
            // }

            useRouter().push(`/cart/${cid}/detail`);

        } catch (error) {
            alert('Cannot book this car on this day');
            // useRouter().push(`/cart/${cid}/detail`);
        }

        // console.log(pickupDate?.format('YYYY-MM-DD'));
    };

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Car: {model}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-medium text-left text-gray-600">Pick-Up Date</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={makeReservation}>
                {/* {isClicked ? 'Reserved!' : 'Reserve this Car'} */}
                Reserve this Car
            </button>
        </main>
    );
}
