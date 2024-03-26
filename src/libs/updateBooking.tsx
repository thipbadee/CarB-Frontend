
import dayjs from "dayjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function updateBooking(dateValue:dayjs.Dayjs | null, bid:string|null, token:string) {

    if (!dateValue) {
        alert('Please select a date');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                bookingDate: dateValue?.format('YYYY-MM-DD')
            })
        });

        return await response.json()

    } catch (error) {
        alert('Cannot book this car on this day');
    }
}