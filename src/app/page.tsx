import Banner from '@/components/Banner'
import { TravelCard } from "@/components/TravelCard";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Banner/>
      <div className="flex flex-row justify-center items-center h-[500px] w-full p-16">
      <Link href="/car" className="bg-red-300 flex justify-center items-center w-1/2 h-full shadow-xl rounded-xl mr-16  hover:bg-red-400  transition-all duration-300 transform hover:scale-110">
      

            <h1 className="text-white font-bold text-5xl ">
            SELECT CAR
            </h1>
      
    
        </Link>
        <Link href="/cart"  className="bg-red-300 flex  justify-center items-center w-1/2 h-full shadow-xl rounded-xl ml-16  hover:bg-red-400 transition-all duration-300 transform hover:scale-110">

        
        <h1 className="text-white font-bold text-5xl">
            BOOKING CART
            </h1>
        
 
        </Link>
      </div>
    </main>
  );
}
