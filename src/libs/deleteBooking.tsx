import { useSession } from 'next-auth/react'
import { useState } from "react";

export default async function deleteBooking({bid, session} : {bid:string, session:any}) {

    // const [message, setMessage] = useState<string>('');
    // const { data: session } = useSession();

    try {
        const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}`
                },
                // body: JSON.stringify({
                //     bookingDate: dateValue?.format('YYYY-MM-DD')
                // })
            });

            if (!response.ok) {
                throw new Error('Delete booking failed');
            }

            // showMessage('Delete booking successful');
        } catch (error) {
            // showMessage('Delete booking failed');
        }

        console.log(bid);

        // return ;

};
