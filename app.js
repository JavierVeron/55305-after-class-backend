import express from "express";
//const {ProductManager} = require("./ProductManager");
import ProductManager from "./ProductManager.js";

const app = express();
const puerto = 8080;
const PM = new ProductManager();
let products = PM.getProducts();

app.get("/products/", (req, res) => {
    let {limit} = req.query;

    res.send({products:limit ? products.slice(0, limit) : products});
});

app.get("/products/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    
    res.send({product:products.find(item => item.id === pid) || "Error! El ID de Producto no existe!"});
});

app.listen(puerto, () => {
    console.log("Servidor activo en el puerto: " + puerto);
});