import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth";
import { cookies } from "next/headers";

export async function POST(req){
    try{
        const cookieStore =await cookies();
        await connectDB();
        const {email,password}=await req.json();

        if(!email||!password){
            return Response.json({error:"All fields required"},{status:400});
        }

        const user=await User.findOne({email})
        if(!user){
            return Response.json({error:"Invalid Credentials"},{status:400})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return Response.json({error:"Invalid Credentials"},{status:400})
        }

        const token=signToken(user)

        cookieStore.set("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/",
            maxAge:60*60*24*7,
        });

        return Response.json({
            message:"Login successful",
        })
    }catch(error){
        return Response.json({error:error.message},{status:500})
    }
}
