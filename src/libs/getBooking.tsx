// import { error } from "console"
import { Bookings } from "../../interfaces"

export default async function getBooking(token:string, bid:string) {

    // console.log("eiei", bid)
    try {
        const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
        })

        return await response.json()

    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch booking")
    }
}