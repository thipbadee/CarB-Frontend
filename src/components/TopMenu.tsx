import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from "next/link";

export default async function TopMenu() {

    const session = await getServerSession(authOptions)


    return (
        <div className="bg-white top-0 right-0 left-0 fixed z-30 h-[75px] flex flex-row">
            <Link href="/">
            <Image src={'/img/logo.png'} className="h-full w-auto hover: transition-all duration-300 transform hover:scale-110" alt='logo'
            width={0} height={0} sizes='100vh'/>
            </Link>
            <TopMenuItem title='Select Car' pageRef='/car'/>
            <TopMenuItem title='Reservations' pageRef='/reservations'/>
            <TopMenuItem title='About us' pageRef='/about'/>
            <div className='flex flex-row absolute right-0 h-full'>
            <TopMenuItem title='Cart' pageRef='/cart'/>
            <TopMenuItem title='Register' pageRef='/register'/>
            {
                session? 
           
                <Link href="/api/auth/signout" className={styles.itemcontainer}>
                    <div className='font-bold items-center h-full  text-red-300 text-sm  hover:text-red-600 transition-all duration-300 transform hover:scale-110'>
                    Sign-Out</div></Link>
        
                : <Link href="/api/auth/signin" className={styles.itemcontainer}>
                    <div className='font-bold items-center h-full  text-red-300 text-sm  hover:text-red-600 transition-all duration-300 transform hover:scale-110'>
                    Sign-In</div>
                    </Link>
            }
            </div>
            
        </div>
    );
}