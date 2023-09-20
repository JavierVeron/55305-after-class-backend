import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email: {
        type:String,
        unique:true
    },
    age:Number,
    password:String,
    cart: {
        type: String,
        ref: 'carts'
    },
    role: {
        type:String,
        default:"user",
        enum:["user", "admin"]
    }
});

export const userModel = mongoose.model("users", userSchema);