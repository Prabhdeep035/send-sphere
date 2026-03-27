import mongoose from "mongoose";

const EmailRecievedSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    reciever_id:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    read:{
        type:Boolean,
        default:false
    },
    star:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export default mongoose.models.EmailRecieved || mongoose.model("EmailRecieved", EmailRecievedSchema);