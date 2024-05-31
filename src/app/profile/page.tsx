"use client"
import axios from "axios"
import React from "react"
import {useRouter} from 'next/navigation'

export default function Profile(){
    const route = useRouter()
    const onLogout = async()=>{
     try {
        const response = await axios.get("/api/users/logout")

        route.push("/login")
     } catch (error:any) {
        console.log(error.message)
        alert("Logout failed")
     }
    }
    return (
        <>
        <div>Profile</div>
        <div><button onClick={onLogout}>Logout</button></div>
        </>
    )
}