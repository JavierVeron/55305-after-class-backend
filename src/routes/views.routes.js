import express from "express";
import ProductManager from "../dao/ProductManager.js";

const router = express.Router();
const PM = new ProductManager();

router.get("/", async (req, res) => {
    const products = await PM.getProducts();
    res.render("home", {products});
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
    res.render("chat");
});


export default router;