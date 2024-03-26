"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";
import { useSession } from 'next-auth/react'
import { use, useState } from "react";
// import deleteBooking from "@/libs/deleteBooking";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth"
import { BookingsItem } from "../../interfaces";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

// import DetailPage from "@/app/cart/[uid]/detail/page";
// import { useRouter } from "next/router";

export default function ReservationCart() {

    // const carItems = useAppSelector((state) => state.cartSlice.carItems);
    // const dispatch = useDispatch<AppDispatch>();

    const deleteBooking = async (bid: string, session: any) => {
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

                const updatedBookings = bookingItems.filter(item => item._id !== bid);
                setBookingItems(updatedBookings);
    
                // showMessage('Delete booking successful');
            } catch (error) {
                // showMessage('Delete booking failed');
            }
    
            console.log(bid);
    }

    const {data: session} = useSession()
    if(!session || !session.user.token) return null

    const [bookingItems, setBookingItems] = useState<BookingsItem[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const res = await getBookings(session.user.token)
            setBookingItems(res.data)
        }
        fetchBookings()
    }, [session.user.token])

    // const res = await getBookings(session.user.token)

    return (
        <div className="flex flex-row flex-wrap">
            {bookingItems.length === 0 ? (
                <div className="text-xl">Empty</div>
            ) : (
                bookingItems.map((BookingsItem) => (
                    <div>
                    <div
                        className="bg-red-300 rounded-xl px-5 mx-5 py-2 my-2 "
                        key={BookingsItem._id}
                    >
                        <Image src={BookingsItem.car?.imageURL ?? ''} alt="car" width={200} height={200} className="w-full h-full" />
                        <div className="text-xl font-bold text-white">{BookingsItem.car?.brand} {BookingsItem.car?.carModel}</div>
                        <div className="text-xl font-bold text-white">license plate: {BookingsItem.car?.licensePlate}</div>
                        <div className="text-xl font-bold text-white">tel: {BookingsItem.car?.tel}</div>
                        <div className="text-sm font-bold text-white">
                            Pick-up Date: {dayjs(BookingsItem?.bookingDate).format('YYYY-MM-DD')}
                        </div>
                        {/* <div className="text-sm">
                            Return {BookingsItem.bookingDate} to {BookingsItem.bookingDate}
                        </div> */}
                        <button
                            className="rounded-md bg-white hover:bg-red-500 px-3 py-2
                            text-red-300 shadow-sm mr-2 mt-3 mb-3"
                            onClick={() => {deleteBooking(BookingsItem._id, session);}}
                        >
                            Remove from Cart
                        </button>
                        <Link href={`/cart/${BookingsItem._id}/detail`}>
                                <button
                                    className="rounded-md bg-white hover:bg-red-500 px-3 py-2
                                    text-red-300 shadow-sm"
                                    // onClick={() => useRouter().push(`/cart/${BookingsItem._id}/detail`)}
                                >
                                    See Detail
                                </button>
                        </Link>

                    </div>
                    </div>
                ))
            )}
        </div>
    );
}
