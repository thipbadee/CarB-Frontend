"use client"

import ReservationCart from "../../../../components/ReservationCart";
import { use, useState } from "react";
import { useEffect } from "react";
import  getBooking  from "../../../../libs/getBooking";
import { BookingsItem, ParamDetail } from "../../../../../interfaces";
import  Image from "next/image";
import Link from "next/link";
import { useSession } from 'next-auth/react'
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LocationDateReserve from "../../../../components/LocationDateReserve";
// import { ParamDetail } from "../../../../../interfaces";

export default function DetailPage(data:ParamDetail) {

    const [bookingItems, setBookingItems] = useState<BookingsItem | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')

    const showDateFill = async () => {
        setIsClicked(true);

        return (
            <div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}} />
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                    text-white shadow-sm" onClick={editBooking}>
                    {isClicked ? 'saved!' : 'save'}
                </button>
            </div>
        )
    }

    const editBooking = async () => {
        setIsClicked(true);
        try {
            const dateValue = pickupDate; // Declare the dateValue variable and assign it the value of pickupDate
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${data.params.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: JSON.stringify({
                    bookingDate: dateValue?.format('YYYY-MM-DD')
                })
            });

            if (!response.ok) {
                alert('Update Booking failed');
                throw new Error('Update Booking failed');
            }

            useRouter().push(`/cart/${data.params.uid}/detail`);

        } catch (error) {
            
        }
    }

    const {data: session} = useSession()
    if(!session || !session.user.token) return null

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingDetail = await getBooking(session.user.token, data.params.uid) as any;
            if (bookingDetail !== undefined) {
                setBookingItems(bookingDetail.data as BookingsItem);
                // console.log("eiei", bookingDetail);
            }
        }
        fetchBookings()
    }, [session.user.token, data.params.uid])
    // console.log("eiei222", bookingItems);

    return(
        <main className="text-center p-5">
            
            <div className="flex flex-col my-10 mx-[27rem] py-5 block rounded-xl bg-red-300 items-center">
                <div className="font-bold text-white text-3xl ">Booking Detail</div>
                <Image src={bookingItems?.car?.imageURL ?? ''} alt='Car Image' width={0} height={0} sizes="100vw" className="rounded-lg w-[50%] m-5"/>
                <div className="text-md mx-5 text-left font-bold text-white">Car: {bookingItems?.car?.brand} {bookingItems?.car?.carModel}</div>
                <div className="text-md mx-5 text-left font-bold text-white">Type: {bookingItems?.car?.type}</div>
                <div className="text-md mx-5 text-left font-bold text-white">Price per day: {bookingItems?.car?.pricePerDay} Baht</div>
                <div className="text-md mx-5 text-left font-bold text-white">License plate: {bookingItems?.car?.licensePlate}</div>
                {/* <div className="text-md mx-5 text-left font-bold text-white">Address: {bookingItems?.car?.address} {bookingItems?.car?.district} {bookingItems?.car?.province} {bookingItems?.car?.province} </div> */}
                <div className="text-md mx-5 text-left font-bold text-white">Google Map URL: <a href={bookingItems?.car?.googleMapsURL} target="_blank" rel="noopener noreferrer">{bookingItems?.car?.googleMapsURL}</a></div>
                <div className="text-md mx-5 text-left font-bold text-white">Tel: {bookingItems?.car?.tel}</div>
                <div className="text-md mx-5 text-left font-bold text-white">
                    Pick-up Date: {dayjs(bookingItems?.bookingDate).format('YYYY-MM-DD')}
                    {/* <Image src='/img/editButton.png' alt='Edit Button' width={0} height={0} sizes="100vw" className="w-[5%] m-5"/> */}
                </div>
                <Link href={`/reservations/update?id=${data.params.uid}&model=${bookingItems?.car?.carModel}`}>
                <button className="block rounded-md bg-white font-bold hover:bg-red-500 hover:text-white px-3 py-2
                text-red-400 shadow-sm mt-5">
                    Edit Booking
                </button>
                </Link>
            </div>
        </main>
    )
}