import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import { UseSelector, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({cartSlice})
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
        reducer: reduxPersistedReducer
})

export type RootStage = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootStage> = useSelector