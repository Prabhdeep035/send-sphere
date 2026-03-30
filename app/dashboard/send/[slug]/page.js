"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "../../../../components/Navbar"
import {useRouter} from "next/navigation"

export default function open(){

    const router= useRouter()
    const params=useParams()

    const [mail, setMail] = useState([])

    const fetchMail= async (id) => {
        const res=await fetch(`/api/email/sent/mailid?id=${id}`,{
            method:"GET",
            credentials:"include",
        })
        if(res.ok){
            const data=await res.json();
            setMail(data.res)
        }
    }

    useEffect(() => {
        const id=params.slug.toString();
        fetchMail(id)
    }, [])
    
    return(
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6">

                <div className="h-36 flex items-center justify-between px-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl mb-6">

                    <h1 className="text-2xl font-semibold tracking-wide">Dashboard</h1>

                    <div className="flex items-center gap-4">
                        <div className="h-24 w-24 bg-white/10 rounded-full flex justify-center items-center relative overflow-hidden shadow-inner">
                            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-green-400 to-green-600 transition-all duration-700"
                            // style={{ height: `${percent}%` }}
                            ></div>

                            <div className="flex justify-center items-center h-20 w-20 rounded-full bg-slate-900 z-10 shadow-md">
                                <span className="text-lg font-semibold">{/* {percent}% */}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">

                    <div className="flex flex-col gap-3 w-60 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">

                        <button onClick={() => { router.push("/dashboard/compose") }} className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                            Compose
                        </button>

                        <button onClick={() => { router.push("/dashboard/recieved") }} className="py-2 rounded-lg bg-white/20 font-semibold shadow">
                            Received
                        </button>

                        <button onClick={() => { router.push("/dashboard/sent") }} className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                            Sent
                        </button>

                    </div>

                    <div className="flex-1">

                        <div className="p-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl max-h-[75vh] overflow-y-auto">

                            <label className="text-sm text-gray-300">To</label>
                            <div className="flex gap-4 p-4 mb-4 bg-white/10 hover:bg-white/20 transition rounded-xl border border-white/10 shadow-md">
                                {mail.reciever_id}
                            </div>

                            <label className="text-sm text-gray-300">Subject</label>
                            <div className="flex gap-4 p-4 mb-4 bg-white/10 hover:bg-white/20 transition rounded-xl border border-white/10 shadow-md">
                                {mail.subject}
                            </div>

                            <label className="text-sm text-gray-300">Message</label>
                            <div className="flex gap-4 p-4 mb-4 bg-white/10 hover:bg-white/20 transition rounded-xl border border-white/10 shadow-md">
                                {mail.message}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}