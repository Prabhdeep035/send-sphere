import { connectDB} from "../../../../lib/db";
import User from "../../../../models/User"
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        await connectDB();

        const{name,email,password}=await req.json();

        //validation
        if(!name ||!email ||!password){
            return Response.json({error: "All fields requires"},{status:400});
        }

        //check if a user exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return Response.json({error:"User already exist"},{status:400})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        //create new User
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return Response.json({message:"User registered successfully"});
    }
    catch(err){
        return Response.json({error:err.message},{status:500})
    }
}