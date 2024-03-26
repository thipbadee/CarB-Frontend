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
import { useRouter } from "next/navigation";
import updateBooking from "@/libs/updateBooking";

export default function ReservationsUpdate() {

    const urlParams = useSearchParams()
    const bid = urlParams.get('id')
    const model = urlParams.get('model')

    const [message, setMessage] = useState<string>('');
    const { data: session } = useSession();
    if (!session || !session.user.token) return null;
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4 bg-red-300 p-32">
            <div className="text-5xl font-bold text-white">Update Booking</div>
            <div className="text-3xl font-bold text-white">Car: {model}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-medium text-center text-white font-bold">Pick-Up Date</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block rounded-md bg-white hover:bg-red-600 hover:text-white px-3 py-2 my-5
            text-red-400 shadow-sm" onClick={() => {updateBooking(pickupDate, bid, session.user.token).then((res) => {
                if (!res.success) {
                    return alert('Cannot book this car on this day');
                }
                    alert('Booking successful')
                    router.push(`/cart`);
            }); }}>
                Update
            </button>
        </main>
    );
}
