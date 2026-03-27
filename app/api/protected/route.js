import { connectDB } from "../../../lib/db";
import { getUserFromToken } from "../../../lib/auth";
import { cookies } from "next/headers";

export async function GET(){
    await connectDB();

    const cookieCounter=await cookies()
    const token=cookieCounter.get("token")?.value
    
    const userId = getUserFromToken(token);

    if(!userId){
        return Response.json({error:"Unauthorized"},{status:401});
    }

    return Response.json({
        messge:"You are authorized",
        userId
    })
}