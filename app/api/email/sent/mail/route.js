import { getUserFromToken } from "../../../../../lib/auth";
import { connectDB } from "../../../../../lib/db";
import { cookies } from "next/headers";
import Email from "../../../../../models/Email";
import EmailRecieved from "../../../../../models/EmailRecieved";
import mongoose from "mongoose";

export async function POST(req){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value;
        const UserId=getUserFromToken(token);

        if(!UserId){
            return Response.json({error:"Unauthorized"},{status:"400"});
        }

        const data=await req.json()
        if(!data.email || !data.subject ||!data.message){
            return Response.json({error:"Enter all details"},{status:"401"})
        }

        const sender=await Email.create({
            sender_id:UserId,
            reciever_id:data.email,
            subject:data.subject,
            message:data.message
        })

        
        const reciever=await EmailRecieved.create({
            sender_id:UserId,
            reciever_id:data.email,
            subject:data.subject,
            message:data.message
        })
        if(!sender || !reciever){
            return Response.json({error:"Enter all details"},{status:"401"})
        }
        return Response.json({message:"Email sent"}) 
    }catch(err){
        console.log(err)
        return Response.json({error:"Server error"},{status:"500"})
    }
}

export async function GET(){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value;
        const UserId=getUserFromToken(token)

        if(!UserId){
            return Response.json({error:"Unauthorized"},{status:"400"});
        }
        const sent=await Email.find({
            sender_id:UserId
        })

        return Response.json({sent});
        
    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:"500"})
    }
}