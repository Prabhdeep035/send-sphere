import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(){
    const cookieCounter=await cookies()

    cookieCounter.set("token","",{
        httpOnly:true,
        expires:new Date(0),
    })

    return Response.json({message:"Logged Out"})
}

export async function GET(){
    const token=(await cookies()).get("token")?.value;
    if(!token)return null

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    return decoded.userId;
}