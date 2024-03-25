import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsItem } from "../../../interfaces";

type CartState = {
    carItems: BookingsItem[]
}

const initialState:CartState = { carItems:[] }

export const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<BookingsItem>)=>{
            state.carItems.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<BookingsItem>)=> {
            const remainItems = state.carItems.filter( obj => {
                return ( (obj.bookingDate !== action.payload.bookingDate)
                && (obj.car !== action.payload.car) )
            } )
            state.carItems = remainItems
        }
    }

})

export const { addReservation, removeReservation } = cartSlice.actions
export default cartSlice.reducer