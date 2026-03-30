"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

export default function Login(){

    const router=useRouter();

    const [Form, setForm] = useState({
        email:"",
        password:""
    })

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const login=await fetch("/api/auth/login",{
            method:"POST",
            body:JSON.stringify(Form),
            credentials:"include"
        })

        if(login.ok){
            router.push("/dashboard/recieved")
            toast.success("Logged in Successfully!");
            
        }else{
            toast.error("Invalid Details");
        }

    }

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-800 via-slate-600 to-slate-900 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.05)_40%,transparent_60%)] bg-blend-overlay">
                <div className="w-120 h-100 border flex items-center flex-col bg-white/10 backdrop-blur-md  border-white/20 rounded-xl shadow-lg">
                    <h1 className="p-10 text-4xl font-serif">Login In</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                        <input required onChange={(e)=>{setForm({...Form,email:e.target.value})}} type="text" className="bg-white w-70 h-10 text-black p-2 border rounded-2xl" placeholder="Enter your email"/>
                        <input required type="password" onChange={(e)=>{setForm({...Form,password:e.target.value})}} className="bg-white w-70 h-10 text-black p-2 border rounded-2xl" placeholder="Enter your password"/>
                        <button className="m-5 ml-18 h-8 w-30 bg-white text-black border rounded-3xl">Login</button>
                    </form>
                    <p className="m-5">If you are not registered:<button onClick={()=>{router.push("/register")}} className="text-blue-400">Register</button></p>
                </div>
            </div>
        </>
    )
}