import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import {Server} from "socket.io";
import ProductManager from "./ProductManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const puerto = 8080;
const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);
const PM = new ProductManager();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
    console.log("Nueva Conexión!");

    const products = PM.getProducts();
    socket.emit("realTimeProducts", products);

    socket.on("nuevoProducto", (data) => {
        const product = {title:data.title, description:"", code:"", price:data.price, status:"", stock:10, category:"", thumbnails:data.thumbnails};
        PM.addProduct(product);
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });

    socket.on("eliminarProducto", (data) => {
        PM.deleteProduct(parseInt(data));
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });
});