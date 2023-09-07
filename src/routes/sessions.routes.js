import express from "express";
import UserManager from "../dao/UserManager.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = express.Router();
const UM = new UserManager();

/* router.get("/login", async (req, res) => {
    let {user, pass} = req.query;

    if (!user || !pass) {
        return res.status(400).send({status:"Error", message:"Complete los campos obligatorios!"});
    }

    const userLogged = await UM.login(user);

    if (!isValidPassword(userLogged, pass)) {
        return res.status(401).send({status:"Error", message:"La contraseña ingresada es incorrecta!"});
    }

    delete userLogged.password;
    req.session.user = userLogged;

    if (userLogged) {
        res.send({status:"OK", message:"Hola, " + userLogged.first_name + "!"});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo loguear el Usuario!"});
    }
}); */

router.get("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({status:"Error", message:"Usuario y Contraseña incorrectos!"});
    }

    req.session.user = {first_name:req.user.first_name, last_name:req.user.last_name, email:req.user.email, age:req.user.age};
    res.send({status:"OK", message:"Hola, " + userLogged.first_name + "!"});
});

/* router.post("/register", async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({status:"Error", message:"Complete los campos obligatorios!"});
    }

    const user = {first_name, last_name, email, age, password:createHash(password)};
    const userRegistered = await UM.addUser(user);

    if (userRegistered) {
        res.send({status:"OK", message:userRegistered});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo registrar el Usuario!"});
    }
}); */

router.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), async (req, res) => {
    res.send({status:"OK", message:"Usuario registrado!"});
});

router.get("/restore", async (req, res) => {
    let {user, pass} = req.query;
    pass = createHash(pass);
    const passwordRestored = await UM.restorePassword(user, pass);

    if (passwordRestored) {
        res.send({status:"OK", message:"La contraseña se ha actualizado correctamente!"});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo actualizar la contraseña!"});
    }    
})

export default router;