import { Bookings } from "../../interfaces"
import getUserProfile from "./getUserProfile"

export default async function getBookings(token:string) :Promise<Bookings>{

    // const profile = await getUserProfile(token)
    
    const response = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Cannot get bookings")
    }

    return await response.json()
}