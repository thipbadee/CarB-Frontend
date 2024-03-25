import Link from "next/link";
import styles from './topmenu.module.css'

export default function TopMenuItem ( { title, pageRef } : { title:string, pageRef:string } ) {
    return (
        <Link href={pageRef} className={styles.itemcontainer}>
            <h1 className="font-bold text-red-300 text-[16px] hover:text-red-600 transition-all duration-300 transform hover:scale-110">
            {title}
            </h1>
        </Link>
    );
}