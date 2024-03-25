'use client'
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingsItem } from "../../../interfaces";
import { addReservation } from "@/redux/features/cartSlice";
import { useSession } from 'next-auth/react'

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
        if(cid && pickupDate && returnDate) {
            const item:BookingsItem = {
                _id: cid,
                bookingDate: dayjs(pickupDate).format("YYYY-MM-DD"),
                // user: session.user.token,
                car: cid,
                createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ")
            }
            dispatch(addReservation(item))
        }

        try {
            const dateValue = pickupDate; // Declare the dateValue variable and assign it the value of pickupDate
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

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            showMessage('Booking successful');
        } catch (error) {
            showMessage('Booking failed');
        }

        // console.log(pickupDate?.format('YYYY-MM-DD'));
    };

    const showMessage = (message: string) => {
        setMessage(message);
    };

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')
    const [returnDate, setReturnDate] = useState<Dayjs|null>(null)
    const [returnLocation, setReturnLocation] = useState<string>('BKK')

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Car: {model}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-medium text-left text-gray-600">Pick-Up Date and Location</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={makeReservation}>
                {isClicked ? 'Reserved!' : 'Reserve this Car'}
            </button>
        </main>
    );
}
