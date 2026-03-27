"use client"
import { isElementAccessExpression, isTemplateExpression } from "typescript"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import { useState, useEffect } from "react"

export default function dashboard() {

    const router = useRouter()

    const [Recieved, setRecieved] = useState([])

    const recievedEmail = async () => {
        const res = await fetch("/api/email/recieved/mail", {
            method: "GET",
            credentials: "include"
        })
        const data = await res.json()
        console.log(data.recieved)
        setRecieved(data.recieved)
    }

    const handleStar = async (id) => {
        const res = await fetch("/api/email/recieved/handle", {
            method: "POST",
            body: JSON.stringify({ id: id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        recievedEmail()
    }

    const handleDelete = async (id) => {
        const res = await fetch("/api/email/recieved/handle", {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({ id: id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        recievedEmail()
    }

    const markRead = async (id) => {
        const res = await fetch("/api/email/recieved/read", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        recievedEmail()
    }

    const markUnread = async (id) => {
        const res = await fetch("/api/email/recieved/unread", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        recievedEmail()
    }

    useEffect(() => {
        recievedEmail();
    }, [])



    return (
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
                            {Recieved.length === 0 ? (

                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 gap-2">
                                    <p className="text-lg font-medium">No mails received 📭</p>
                                    <p className="text-sm opacity-70">You're all caught up!</p>
                                </div>

                            ) : (

                                Recieved.map((mail) => {
                                    return (
                                        <div
                                            key={mail._id}
                                            className="flex gap-4 p-4 mb-4 bg-white/10 hover:bg-white/20 transition rounded-xl border border-white/10 shadow-md"
                                        >

                                            <div
                                                className="cursor-pointer flex flex-col gap-1"
                                                onClick={() => {
                                                    markRead(mail._id);
                                                }}
                                            >
                                                <p className={`text-lg font-semibold ${mail.read && "opacity-50"}`}>
                                                    {mail.sender_id.email}
                                                </p>

                                                <p className={`text-md ${mail.read && "opacity-50"}`}>
                                                    {mail.subject}
                                                </p>

                                                <p className={`text-sm text-gray-300 ${mail.read && "opacity-40 line-through"}`}>
                                                    {mail.message}
                                                </p>
                                            </div>

                                            <div className="ml-auto flex items-center gap-3">

                                                <button
                                                    onClick={() => markUnread(mail._id)}
                                                    className="hover:scale-110 transition"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/apmrcxtj.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#30e849"
                                                        style={{ width: "28px", height: "28px" }}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => handleStar(mail._id)}
                                                    className="hover:scale-110 transition"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                        trigger="click"
                                                        colors={mail.star ? "primary:#facc15,secondary:#facc15" : "primary:#ffffff,secondary:#ffffff"}
                                                        style={{ width: "28px", height: "28px" }}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(mail._id)}
                                                    className="hover:scale-110 transition"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        colors="primary:#ef4444,secondary:#ef4444"
                                                        style={{ width: "28px", height: "28px" }}
                                                    />
                                                </button>

                                            </div>
                                        </div>
                                    );
                                }))}

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}