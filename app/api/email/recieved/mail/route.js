import { getUserFromToken } from "../../../../../lib/auth";
import { connectDB } from "../../../../../lib/db";
import { cookies } from "next/headers";
import User from "../../../../../models/User";
import EmailRecieved from "../../../../../models/EmailRecieved";

export async function GET(){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value
        const UserId=getUserFromToken(token);
        
        if(!UserId){
            return Response.json({error:"Unauthorized"},{status:"400"});
        }

        const user=await User.findOne({_id:UserId})

        if(!user){
            return Response.json({error:"No Data"},{status:"401"})
        }

        const recieved=await EmailRecieved.find({
            reciever_id:user.email
        }).populate('sender_id','email')
        
        if(!recieved){
            return Response.json({error:"No Emails found"},{status:"401"})
        }

        return Response.json({recieved});


    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:"500"})
    }
}