import { Session } from "next-auth"

export default async function getMe(user:Session) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user.user.token
        } 
    })
    if(!response.ok) {
        throw new Error("Failed to log-in")
    }

    return await response.json()
}