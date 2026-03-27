import { connectDB } from "../../../../../lib/db";
import { getUserFromToken } from "../../../../../lib/auth";
import EmailRecieved from "../../../../../models/EmailRecieved";
import { cookies } from "next/headers";


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
        
        const log=await EmailRecieved.findOne({_id:id})
        if(log){
            log.read=true;
            await log.save()
        }
        return Response.json({message:"Starred"})
    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:"500"})
    }
}
