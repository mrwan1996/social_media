import mongoose, { Schema } from "mongoose";
const newpost = new Schema({
    body:{
        type:String,
        require:true,
    },
    createdby:
    {
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    private:{
        type:Boolean,
        default:false
    },
    like:[{
        type:Schema.Types.ObjectId,
        ref:'user',
    }],
    dislike:[{
        type:Schema.Types.ObjectId,
        ref:'user',
    }],
    // relation with comments
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'comment',
    }]
    
},{
    timestamps:true
}
)
export const postmodel = mongoose.model("post",newpost)