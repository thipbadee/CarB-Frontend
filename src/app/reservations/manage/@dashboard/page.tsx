import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import Car from "@/db/models/Car"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DashboardPage() {

    const addCar = async (addCarForm:FormData) => {
        "use server"
        const brand = addCarForm.get("brand")
        const carModel = addCarForm.get("carModel")
        const type = addCarForm.get("type")
        const pricePerDay = addCarForm.get("pricePerDay")
        const licensePlate = addCarForm.get("licensePlate")
        const address = addCarForm.get("address")
        const district = addCarForm.get("district")
        const province = addCarForm.get("province")
        const postalCode = addCarForm.get("postalCode")
        const googleMapsURL = addCarForm.get("googleMapsURL")
        const imageURL = addCarForm.get("imageURL")
        const tel = addCarForm.get("tel")

        try {
            await dbConnect()
            const car = await Car.create({
                "brand": brand,
                "carModel": carModel,
                "type": type,
                "pricePerDay": pricePerDay,
                "licensePlate": licensePlate,
                "address": address,
                "district": district,
                "province": province,
                "postalcode": postalCode,
                "googleMapsURL": googleMapsURL,
                "imageURL": imageURL,
                "tel": tel
            })
        } catch(error) {
            console.log(error)
        }
        revalidateTag("cars")
        redirect("/car")
    }

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return(
        <main className="bg-red-300 m-5 p-5 font-bold flex items-center text-center justify-center">
            {/* <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table> */}

            {
                (profile.data.role=="admin")?
                <form action={addCar}>
                    <div className="text-xl text-white">Create Car Model</div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="brand">
                            Brand</label> */}
                        <input type="text" required id="brand" name="brand" placeholder="Brand"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="carModel">
                            Car Model</label> */}
                        <input type="text" required id="carModel" name="carModel" placeholder="Car Model"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="type">
                            Type (ex. Sedan, Pickup etc.)</label> */}
                        <input type="text" required id="type" name="type" placeholder="Type"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="pricePerDay">
                            Price per day</label> */}
                        <input type="text" required id="pricePerDay" name="pricePerDay" placeholder="price Per Day"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="licensePlate">
                            License plate</label> */}
                        <input type="text" required id="licensePlate" name="licensePlate" placeholder="License plate"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="address">
                            Address</label> */}
                        <input type="text" required id="address" name="address" placeholder="Address"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="district">
                            District</label> */}
                        <input type="text" required id="district" name="district" placeholder="District"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="province">
                            Province</label> */}
                        <input type="text" required id="province" name="province" placeholder="Province"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="postalCode">
                            Postal code</label> */}
                        <input type="text" required id="postalCode" name="postalCode" placeholder="Postal code"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="googleMapsURL">
                            Google Maps URL</label> */}
                        <input type="text" required id="googleMapsURL" name="googleMapsURL" placeholder="Google Maps URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="imageURL">
                            Image URL</label> */}
                        <input type="text" required id="imageURL" name="imageURL" placeholder="Image URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-full my-2">
                        {/* <label className="w-auto block text-white pr-4" htmlFor="tel">
                            Tel</label> */}
                        <input type="text" required id="tel" name="tel" placeholder="tel"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-white focus:outline-none focus:border-blue-400"/>
                    </div>

                    <button type="submit" className="bg-white text-red-400 w-full hover:bg-red-500 hover:text-white p-2 rounded">Add New Car</button>
                </form>
                : null
            }

        </main>
    )
}