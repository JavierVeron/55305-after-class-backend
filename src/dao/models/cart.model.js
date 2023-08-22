import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id:Number,
    products:Array
});

export const cartModel = mongoose.model("carts", cartSchema);