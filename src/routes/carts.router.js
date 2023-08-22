import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", async (req, res) => {
    const newCart = await CM.newCart();

    if (newCart) {
        res.send({status:"ok", message:"El Carrito se creó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo crear el Carrito!"});
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await CM.getCart(cid);

    if (cart) {
        res.send({products:cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! No se encuentra el ID de Carrito!"});
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await CM.addProductToCart(cid, pid);

    if (result) {
        res.send({status:"ok", message:"El producto se agregó correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
    }
});

export default cartsRouter;