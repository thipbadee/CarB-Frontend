"use client"

import EditBooking from "@/components/EditBooking"
import { useSearchParams } from "next/navigation"
import LocationDateReserve from "@/components/LocationDateReserve";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import updateBooking from "@/libs/updateBooking";
import { useSession } from 'next-auth/react'

export default function UpdatePage(bid:string) {

    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')

    const { data: session } = useSession();
    if (!session || !session.user.token) return null;

    const updateBookings = async () => {

        setIsClicked(true);

        try {
            const dateValue = pickupDate

            const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${session?.user.token}`
                },
                body: JSON.stringify({
                    bookingDate: dateValue?.format('YYYY-MM-DD')
                })
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

        } catch (error) {
            
        }
    }

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4 rounded-lg bg-slate-50">
            <div className="text-xl font-medium">Update Booking</div>
            
            <div className="w-fit space-y-2">
                <div className="text-medium text-left text-gray-600">Pick-Up Date and Location</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={() => {updateBooking(pickupDate, bid, session.user.token).then((res) => {
                router.push(`/cart`);
                // console.log(res)
                // if (!res.success) {
                //     return alert('Cannot book this car on this day');
                // }
                //     alert('Booking successful')
                //     router.push(`/cart`);
            }); }}>
                Update
            </button>
        </main>
    );
}