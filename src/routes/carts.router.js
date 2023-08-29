import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", async (req, res) => {
    const cart = await CM.newCart();

    if (cart) {
        res.send({status:"ok", message:"El Carrito se creó correctamente!", id:cart._id});
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

/* cartsRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const result = await CM.updateProductToCart(cid, pid);

    if (result) {
        res.send({status:"ok", message:"El producto se agregó correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
    }
}); */

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const result = await CM.updateQuantityProductFromCart(cid, pid, quantity);

    if (result) {
        res.send({status:"ok", message:"El producto se actualizó correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo actualizar el Producto del Carrito!"});
    }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await CM.deleteProductFromCart(cid, pid);

    if (result) {
        res.send({status:"ok", message:"El producto se eliminó correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo eliminar el Producto del Carrito!"});
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const result = await CM.deleteProductsFromCart(cid);

    if (result) {
        res.send({status:"ok", message:"El carrito se vació correctamente!"});
    } else {
        res.status(400).send({status:"error", message:"Error! No se pudo vaciar el Carrito!"});
    }
});

export default cartsRouter;