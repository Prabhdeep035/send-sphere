"use client"
import { isElementAccessExpression, isTemplateExpression } from "typescript"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import { useState, useEffect } from "react"

export default function dashboard() {

    const router = useRouter()
    const [sent, setSent] = useState([])

    const emailSent = async () => {
        const res = await fetch("/api/email/sent/mail", {
            method: "GET",
            credentials: "include"
        })
        if (res.ok) {
            const data = await res.json()
            setSent(data.sent);
            console.log(data.sent)
        }
    }

    const handleStar = async (id) => {
        const res = await fetch("/api/email/sent/handle", {
            method: "POST",
            body: JSON.stringify({ id: id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        emailSent()
    }

    const handleDelete = async (id) => {
        const res = await fetch("/api/email/sent/handle", {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({ id: id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        emailSent()
    }

    useEffect(() => {
        emailSent()
    }, [])


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6">

                <div className="h-36 flex items-center justify-between px-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl mb-6">

                    <h1 className="text-2xl font-semibold tracking-wide">Sent</h1>

                    <div className="flex items-center gap-4">
                        <div className="h-24 w-24 bg-white/10 rounded-full flex justify-center items-center relative overflow-hidden shadow-inner">

                            <div
                                className="absolute bottom-0 left-0 w-full bg-linear-to-t from-green-400 to-green-600 transition-all duration-700"
                            // style={{ height: `${percent}%` }}
                            ></div>

                            <div className="flex justify-center items-center h-20 w-20 rounded-full bg-slate-900 z-10 shadow-md">
                                {/* <span className="text-lg font-semibold">{percent}%</span> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">

                    <div className="flex flex-col gap-3 w-60 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">

                        <button
                            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                            onClick={() => { router.push("/dashboard/compose") }}
                        >
                            Compose
                        </button>

                        <button
                            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                            onClick={() => { router.push("/dashboard/recieved") }}
                        >
                            Recieved
                        </button>

                        <button
                            className="py-2 rounded-lg bg-white/20 font-semibold shadow"
                            onClick={() => { router.push("/dashboard/sent") }}
                        >
                            Sent
                        </button>

                    </div>

                    <div className="flex-1">

                        <div className="p-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl max-h-[75vh] overflow-y-auto">

                            {sent.length === 0 ? (

                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 gap-2">
                                    <p className="text-lg font-medium">No mails sent 📭</p>
                                    <p className="text-sm opacity-70">Start by composing a new message</p>
                                </div>

                            ) : (

                                sent.map((mail) => {
                                    return (
                                        <div
                                            key={mail._id}
                                            className="flex gap-4 p-4 mb-4 bg-white/10 hover:bg-white/20 transition rounded-xl border border-white/10 shadow-md"
                                        >

                                            {/* CONTENT */}
                                            <div
                                                className="cursor-pointer flex flex-col gap-1"
                                                onClick={() => router.push("/mail")}
                                            >
                                                <p className="text-lg font-semibold">
                                                    {mail.subject}
                                                </p>

                                                <p className="text-sm text-gray-300">
                                                    {mail.message}
                                                </p>
                                            </div>

                                            {/* ACTIONS */}
                                            <div className="ml-auto flex items-center gap-3">

                                                <button
                                                    onClick={() => { handleStar(mail._id) }}
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
                                                    onClick={() => { handleDelete(mail._id) }}
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
                                    )
                                })

                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}