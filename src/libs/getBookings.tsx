import { Bookings } from "../../interfaces"

export default async function getBookings(token:string) :Promise<Bookings>{
    
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