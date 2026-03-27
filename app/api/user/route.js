import { cookies } from "next/headers";
import { connectDB } from "../../../lib/db";
import { getUserFromToken } from "../../../lib/auth";
import User from "../../../models/User";

export async function GET(){
    try{
        await connectDB();

        const cookieCounter=await cookies();
        const token=cookieCounter.get("token")?.value;
        const UserId=getUserFromToken(token)

        if(!UserId){
            return Response.json({error:"Unauthorized"},{status:"400"})
        }

        const user=await User.findOne({_id:UserId})
        const name=user.name
        return Response.json({name})

    }catch(err){
        console.log(err)
        return Response.json({error:"Server Error"},{status:"500"})
    }
}