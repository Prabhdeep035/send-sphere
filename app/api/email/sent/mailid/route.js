import { getUserFromToken } from "../../../../../lib/auth";
import { cookies } from "next/headers";
import Email from "../../../../../models/Email";
import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";

export async function GET(req){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value
        const UserId=getUserFromToken(token)
        
        if(!UserId){
            return Response.json({error:"Unauthorized"},{status:"400"})
        }
        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        
        const res=await Email.findById(id).populate('sender_id','email');
        
        return Response.json({res})
    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:"500"})
    }
}