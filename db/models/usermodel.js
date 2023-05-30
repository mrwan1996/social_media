import mongoose, { Schema } from "mongoose";
const newuser = new Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },

    profile_pic: {
        type: String,
    },
    logedin: {
        type: Boolean,
        default: false
    },


    // Relation with posts

    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]


}, {
    timestamps: true
}
)
export const usermodel = mongoose.model("user", newuser)