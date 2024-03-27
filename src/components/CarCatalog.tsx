import ProductCard from "./ProductCard"
import Link from "next/link"
import { Car, CarJson } from "../../interfaces"

export default async function CarCatalog({carJson} : {carJson:CarJson}) {
    const carJsonReady = await carJson
    return (
        <>

        <div className="m-10 flex flex-row flex-wrap place-content-around xl " >
                {
                    carJsonReady.data.map((carItem:Car)=>(
                        <Link href={`/car/${carItem._id}` } 
                        className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                        p-2 sm:p-4 md:p-4 lg:p-8">
                        <ProductCard carName={carItem.carModel} imgSrc={carItem.imageURL}/>
                        </Link>
                    ))
                }
                
        </div>
        </>
    )
}