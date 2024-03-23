import Image from "next/image"
import getCar from "@/libs/getCar"
import Link from "next/link"

export default async function CarDetailPage( {params} : { params: {cid:string}} ) {

    const carDetail = await getCar(params.cid)
    
    /**
     * Mock Data for Demonstration Only
     */

    /*
    const mockCarRepo = new Map()
    mockCarRepo.set("001", {name: "Honda Civic", image:"/img/civic.jpg"})
    mockCarRepo.set("002", {name: "Honda Accord", image:"/img/accord.jpg"})
    mockCarRepo.set("003", {name: "Honda Accord", image:"/img/accord.jpg"})
    mockCarRepo.set("004", {name: "Tesla Model 3", image:"/img/tesla.jpg"})
    */

    return(
        <main className="text-center p-5">
            
            <div className="flex flex-row my-5">
                <Image src={ carDetail.data.imageURL }
                    alt='Car Image'
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">{  carDetail.data.brand }
                <div className="text-md mx-5">Car model: {  carDetail.data.carModel }</div>
                <div className="text-md mx-5">Type: {  carDetail.data.type }</div>
                <div className="text-md mx-5">Price per day: {  carDetail.data.pricePerDay }</div>
                <div className="text-md mx-5">License plate: {  carDetail.data.licensePlate }</div>
                <div className="text-md mx-5">Address: {  carDetail.data.address }</div>
                <div className="text-md mx-5">District: {  carDetail.data.district }</div>
                <div className="text-md mx-5">Province: {  carDetail.data.province }</div>
                <div className="text-md mx-5">Postal code: {  carDetail.data.postalCode }</div>
                <div className="text-md mx-5">Google map URL: {  carDetail.data.googleMapsURL }</div>
                <div className="text-md mx-5">Tel.: {  carDetail.data.tel }</div>
                
                
                <Link href={`/reservations?id=${params.cid}&model=${carDetail.data.carModel}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                text-white shadow-sm">
                    Make Reservation
                </button>
                </Link>
                
                </div>
                
                
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    return [{cid:'001'}, {cid:'002'}, {cid:'003'}, {cid:'004'}]
}