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
import { redirect } from 'next/navigation'
import { useRouter } from "next/navigation";
import createBooking from "@/libs/createBooking";

export default function Reservations () {

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const model = urlParams.get('model')

    const [message, setMessage] = useState<string>('');
    const { data: session } = useSession();
    if (!session || !session.user.token) return null;
    const [isClicked, setIsClicked] = useState(false);

    const router = useRouter();
    
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
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${cid}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: JSON.stringify({
                    bookingDate: dateValue?.format('YYYY-MM-DD')
                })
            });


            if (response.ok) {
                alert('Booking successful');
                // redirect(`/cart`)
            } else {
                alert('Cannot book this car on this day');
                throw new Error('Booking failed');
            }

        } catch (error) {
            // alert('Cannot book this car on this day');
        }

        // console.log(pickupDate?.format('YYYY-MM-DD'));
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
        
            <button className="block rounded-md bg-red-300 w-[80%] hover:bg-red-400 transition-all duration-300 transform hover:scale-110 px-3 py-2
            text-white shadow-sm" onClick={() => {createBooking(pickupDate, cid, session.user.token).then((res) => {
                // console.log(res)
                if (!res.success) {
                    return alert('Cannot book this car on this day');
                }
                    alert('Booking successful')
                    router.push(`/cart`);
            }); }}>
                Reserve this Car
            </button>

        </main>
    );
}
