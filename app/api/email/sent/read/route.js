import { getUserFromToken } from "../../../../../lib/auth";
import { connectDB } from "../../../../../lib/db";
import { cookies } from "next/headers";
import Email from "../../../../../models/Email";

export async function POST(req){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value
        const UserID=getUserFromToken(token);

        if(!UserID){
            return Response.json({error:"Unauthorized"},{status:"400"})
        }

        const{id}=await req.json();
        
        const log=await Email.findOne({_id:id})
        if(log){
            log.read=!log.read
            await log.save()
        }
        return Response.json({message:"Starred"})
    }catch(err){
        return Response.json({error:"Server Error"},{status:"500"})
    }
}
