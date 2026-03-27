import jwt from "jsonwebtoken";

export const signToken=(user)=>{
    return jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};


// export const verifyToken=(token)=>{
//     try{
//         return jwt.verify(token,process.env.JWT_SECRET);
//     }catch(error){
//         return null;
//     }
// };

export const getUserFromToken=(token)=>{
    try{
        if(!token)return null;
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
        return decoded.userId;
    }catch(error){
        return null;
    }
};