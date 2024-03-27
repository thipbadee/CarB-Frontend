
import dayjs from "dayjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function createBooking(dateValue:dayjs.Dayjs | null, cid:string|null, token:string) {

    // const session = await getServerSession(authOptions)
    // console.log("eiei", session)
    // if(!session || !session.user.token) return null

    if (!dateValue) {
        alert('Please select a date');
        return;
    }

    if (!cid) {
        alert('Please select a car');
        return;
    }

    // console.log("eiei", bid)
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${cid}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingDate: dateValue?.format('YYYY-MM-DD')
                })
            });
            // console.log("eiei", response)

        return await response.json()

    } catch (error) {
        // console.log(error)
        alert('Cannot book this car on this day');
        throw new Error("Failed to fetch booking")
    }
}