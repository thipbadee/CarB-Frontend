import { useState, useEffect } from "react"

export function useWindowListener(eventType:string, listener:EventListener) {
    
    useEffect(()=>{
        
        window.addEventListener(eventType, listener)

        return ()=>{
            window.removeEventListener(eventType, listener)
        }

    }, [eventType, listener])
}