"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
    const router = useRouter();
    const [Form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(Form),
        });
        if (res.ok) {
            toast.success("Registered Successfully");
            router.push("/login");
        } else {
            toast.error("Server Error");
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-800 via-slate-600 to-slate-900 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.05)_40%,transparent_60%)] bg-blend-overlay">
                <div className="w-120 h-130 border flex items-center flex-col bg-white/10 backdrop-blur-md  border-white/20 rounded-xl shadow-lg">
                    <h1 className="p-10 text-4xl font-serif">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                        <input required onChange={(e) => { setForm({ ...Form, name: e.target.value }) }} type="text" className="bg-white w-70 h-10 text-black p-2 border rounded-2xl" placeholder="Enter your name" />
                        <div className="flex items-center w-70 h-10 bg-white text-black rounded-2xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-green-400">

                            <input
                                required
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase().replace(/\s+/g, "");
                                    setForm({ ...Form, email: `${value}@sendsphere.com` });
                                }}
                                type="text"
                                className="flex-1 h-full p-2 w-40 outline-none bg-transparent rounded-l-2xl"
                                placeholder="Enter your email"
                            />

                            <div className=" h-full flex items-center bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                                @sendsphere.com
                            </div>

                        </div>
                        <input required type="password" onChange={(e) => { setForm({ ...Form, password: e.target.value }) }} className="bg-white w-70 h-10 text-black p-2 border rounded-2xl" placeholder="Enter your password" />
                        <button className="m-5 ml-18 h-8 w-30 bg-white text-black border rounded-3xl">Register</button>
                    </form>
                    <p className="m-10">If you are already registered:<button onClick={() => { router.push("/login") }} className="text-blue-400">Login</button></p>
                </div>
            </div>
        </>
    )
}