"use client"
import { isElementAccessExpression, isTemplateExpression } from "typescript"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import { useState ,useEffect } from "react"

export default function dashboard(){

    const router= useRouter()

    const recievedEmail=async()=>{
        const res=await fetch("/api/email/recieved",{
            method:"GET",
            credentials:"include"
        })
        const data=await res.json()
        console.log(data);
    }

    useEffect(() => {
        recievedEmail();
    }, [])
    
    

    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-linear-to-br from-slate-800 via-slate-600 to-slate-900 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.05)_40%,transparent_60%)] bg-blend-overlay">
                <div className="h-40 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">

                    
                   <div className="progress flex ml-auto mr-5 gap-2">
                        <div className="h-30 w-30  bg-white rounded-full flex justify-center items-center relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full bg-linear-to-br from-slate-900 via-slate-700 to-slate-900 bg-blend-overlay transition-all duration-700"
                                // style={{ height: `${percent}%` }}
                            ></div>
                            <div className=" flex justify-center items-center h-25 w-25 rounded-full bg-linear-to-br from-slate-900 via-slate-700 to-slate-900 bg-blend-overlay z-10">
                                {/* <h1 className="text-3xl">{percent}%</h1> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-5 min-w-80 my-5 p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg opacity-50" onClick={()=>{router.push("/dashboard/compose")}}>Compose</button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg" onClick={()=>{router.push("/dashboard/recieved")}}>Recieved</button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg opacity-50" onClick={()=>{router.push("/dashboard/sent")}}>Sent</button>
                    </div>
                    <div className="">
                        <div className="h-100 w-230 p-5 mt-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}