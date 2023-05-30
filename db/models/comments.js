import mongoose, { Schema } from "mongoose";
const newcomment = new Schema({
    body:{
        type:String,
        require:true,
    },
    createdby:
    {
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    postid:
    {
        type:Schema.Types.ObjectId,
        ref:'post',
    }
},{
    timestamps:true
}
)
export const commentmodel = mongoose.model("comment",newcomment)