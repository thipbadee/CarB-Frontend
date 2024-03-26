'use client'
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { CreateBooking } from "../../../interfaces";
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
            const response = await fetch(`http://localhost:5000/api/v1/cars/${cid}/bookings`, {
                method: 'POST',
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

    const showMessage = (message: string) => {
        setMessage(message);
    };

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4 p-10">
            <div className="text-5xl font-bold mt-5 text-red-500">New Reservation</div>
            <div className="text-3xl font-bold mt-5 text-red-400">Car: {model}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-xl text-center font-bold text-red-400">Pick-Up Date</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block w-[80%] bg-red-400 rounded-md hover:bg-red-500 transition-all duration-300 transform hover:scale-110 px-3 py-10 mb-5
            text-white shadow-sm font-bold text-3xl" onClick={makeReservation}>
                {/* {isClicked ? 'Reserved!' : 'Reserve this Car'} */}
                Reserve this Car
            </button>
        </main>
    );
}
