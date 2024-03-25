"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { useSession } from 'next-auth/react'
import { useState } from "react";

export default function ReservationCart() {

    const carItems = useAppSelector((state) => state.cartSlice.carItems);
    const dispatch = useDispatch<AppDispatch>();

    const [message, setMessage] = useState<string>('');
    const { data: session } = useSession();

    const deleteBooking = async (bid:string) => {
        // 'use server'
        try {
            
            const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}`
                },
                // body: JSON.stringify({
                //     bookingDate: dateValue?.format('YYYY-MM-DD')
                // })
            });

            if (!response.ok) {
                throw new Error('Delete booking failed');
            }

            showMessage('Delete booking successful');
        } catch (error) {
            showMessage('Delete booking failed');
        }

        console.log(bid);

    };

    const showMessage = (message: string) => {
        setMessage(message);
    };

    return (
        <>
            {carItems.length === 0 ? (
                <div className="text-xl">Empty</div>
            ) : (
                carItems.map((BookingsItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                        key={BookingsItem._id}
                    >
                        <div className="text-xl">{BookingsItem.car}</div>
                        <div className="text-sm">
                            Pick-up {BookingsItem.bookingDate} from {BookingsItem.bookingDate}
                        </div>
                        <div className="text-sm">
                            Return {BookingsItem.bookingDate} to {BookingsItem.bookingDate}
                        </div>
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                            text-white shadow-sm"
                            onClick={() => {dispatch(removeReservation(BookingsItem)); deleteBooking(BookingsItem._id);}}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))
            )}
        </>
    );
}
