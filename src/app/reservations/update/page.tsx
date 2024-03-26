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
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Update Booking</div>
            <div className="text-xl font-medium">Car: {model}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-medium text-left text-gray-600">Pick-Up Date</div>
                <LocationDateReserve onDateChange={(dateValue:Dayjs)=>{setPickupDate(dateValue)}}
                onLocationChange={(locaValue:string)=>{setPickupLocation(locaValue)}}
                />
            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={() => {updateBooking(pickupDate, bid, session.user.token).then((res) => {
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
