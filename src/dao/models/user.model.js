import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    role: {
        type:String,
        default:"user",
        enum:["user", "admin"]
    }
});

export const userModel = mongoose.model("users", userSchema);