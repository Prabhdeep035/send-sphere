"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import getUserFromToken from "../lib/auth"
import toast from 'react-hot-toast'

const Navbar = () => {
  const router = useRouter()

  const [Name, setName] = useState("")

  const handleLogout = async (e) => {

    const log = await fetch("/api/auth/logout", {
      method: "POST"
    })

    if (log.ok) {
      router.push("/login");
      toast.success("Logout Successfully!");

    }
  }

  const fetchName = async () => {
    const res = await fetch("/api/user", {
      method: "GET",
      credentials: "include"
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data.name)
      setName(data.name)
    }
  }

  useEffect(() => {
    fetchName()
  }, [])


  return (
    <div className="h-16 flex items-center px-6 sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">

      <h1 className="font-semibold text-xl tracking-wide">
        SendSphere
      </h1>

      <div className="ml-auto flex items-center gap-4">

        <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-medium">
          {Name}
        </div>

        <button
          onClick={() => { handleLogout() }}
          className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg shadow-sm transition duration-200 font-medium"
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Navbar
