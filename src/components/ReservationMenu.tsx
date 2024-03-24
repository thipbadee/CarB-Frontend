import { Link } from '@mui/material';
import styles from './reservationmenu.module.css'

export default function ReservationMenu() {
    return(
        <div className={styles.submenu}>
            {/* Sub-Menu Here */}
            <Link href='/reservations/manage'>manage car (for admin only!)</Link>
        </div>
    );
}