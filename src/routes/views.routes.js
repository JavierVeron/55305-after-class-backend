import express from "express";
import ProductManager from "../ProductManager.js";

const router = express.Router();
const PM = new ProductManager();

router.get("/", (req, res) => {
    const products = PM.getProducts();
    res.render("home", {products});
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;