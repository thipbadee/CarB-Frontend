import getCars from "@/libs/getCars"
import CarCatalog from "@/components/CarCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CarPanel from "@/components/CarPanel"
import { CarJson } from "../../../../interfaces"

export default async function Car() {
    const cars:CarJson = await getCars()
    
    
    return (
        <main className="p-10">
            <div className=" font-bold text-5xl text-red-400"> Avaliable Cars</div>
            <br />
            <hr className="border-t-[5px] border-red-400"/>
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> }>
            <CarCatalog carJson={cars}/>
            </Suspense>

            
        </main>
    )
}