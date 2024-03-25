import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth"

export default async function ManagePage() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const res = await getBookings(session.user.token)
        
    // console.log(res)

    return(
        <main>
            <div>Your Reservations</div>
            {res.data.map((bookingItems)=>{
                return (
                    <div>
                        {bookingItems.bookingDate} {bookingItems.car?.carModel} {bookingItems.createdAt}
                    </div>
                )
            })}
        </main>
    )
}