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
          user-friendly and efficient online platform designed to streamline the process of reserving and managing car rentals. With its intuitive interface and robust features, B1 enables users to easily search for available vehicles, make reservations, and handle booking-related tasks with convenience and ease.
          </h1>
          <br />
          <h1 className="font-bold text-4xl text-white">Members</h1>
            <br />
          <ul className="font-bold text-2xl text-white">
        <li>Jirameth Wannasiwaporn ( 6633033021 )</li>
        <li>Jirameth Wannasiwaporn ( 6633033021 )</li>
        <li>Jirameth Wannasiwaporn ( 6633033021 )</li>
          </ul>
        </div>
    );
}