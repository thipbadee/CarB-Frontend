import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from "next/link";

export default function footr() {

    


    return (
        <div className="h-[500px] bg-red-400  w-full p-[50px] text-center drop-shadow-xl">
          <h1 className="font-bold text-4xl text-white">Car Booking Web App</h1>
          <br />
          <h1 className="font-bold text-2xl text-white">
          a user-friendly online platform that simplifies car rental reservations. It offers an intuitive interface and robust features for searching, booking, and managing vehicle rentals efficiently.
          </h1>
          <br />
          <h1 className="font-bold text-4xl text-white">Members</h1>
            <br />
          <ul className="font-bold text-2xl text-white">
        <li>Jirameth Wannasiwaporn ( 6633033021 )</li>
        <li>Thipbadee Ngamsukkasemsri ( 6633109021 )</li>
        <li>Amphikapha Thathong ( 6633287021 )</li>
          </ul>
        </div>
    );
}