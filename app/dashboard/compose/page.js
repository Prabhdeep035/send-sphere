"use client"
import { isElementAccessExpression, isTemplateExpression } from "typescript"
import { useRouter } from "next/navigation"
import Navbar from "../../../components/Navbar"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export default function dashboard() {

    const router = useRouter()
    const [Form, setForm] = useState({
        email: "",
        subject: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        const res = await fetch("/api/email/sent/mail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Form)
        })
        if(res.ok){
            toast.success("Message sent successfully!");
            setForm({email:"",subject:"",message:""})
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6">

                <div className="h-36 flex items-center justify-between px-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl mb-6">

                    <h1 className="text-2xl font-semibold tracking-wide">Compose</h1>

                    <div className="progress flex gap-4">
                        <div className="h-24 w-24 bg-white/10 rounded-full flex justify-center items-center relative overflow-hidden shadow-inner">

                            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-green-400 to-green-600 transition-all duration-700"></div>

                            <div className="flex justify-center items-center h-20 w-20 rounded-full bg-slate-900 z-10 shadow-md"></div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">

                    <div className="flex flex-col gap-3 w-60 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">

                        <button className="py-2 rounded-lg bg-white/20 font-semibold shadow">
                            Compose
                        </button>

                        <button
                            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                            onClick={() => { router.push("/dashboard/recieved") }}
                        >
                            Recieved
                        </button>

                        <button
                            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                            onClick={() => { router.push("/dashboard/sent") }}
                        >
                            Sent
                        </button>

                    </div>

                    <div className="flex-1">

                        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">

                            <form className="flex flex-col gap-5">

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-300">To</label>
                                    <input
                                        className="p-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                        value={Form.email}
                                        onChange={(e) => { setForm({ ...Form, email: e.target.value }) }}
                                        type="email"
                                        placeholder="Enter email..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-300">Subject</label>
                                    <input
                                        className="p-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                        value={Form.subject}
                                        onChange={(e) => { setForm({ ...Form, subject: e.target.value }) }}
                                        type="text"
                                        placeholder="Enter subject..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-300">Message</label>
                                    <textarea
                                        className="p-3 min-h-[180] bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
                                        value={Form.message}
                                        onChange={(e) => { setForm({ ...Form, message: e.target.value }) }}
                                        placeholder="Write your message..."
                                    ></textarea>
                                </div>

                            </form>

                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold shadow-md transition"
                                    onClick={() => { handleSubmit() }}
                                >
                                    Send 📤
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}