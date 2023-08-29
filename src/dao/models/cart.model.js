import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
          product: {
            type: String,
            ref: 'products'
          },
          quantity: Number,
        }
    ]
});

cartSchema.pre("findOne", function() {
    this.populate("products.product");
});

export const cartModel = mongoose.model("carts", cartSchema);