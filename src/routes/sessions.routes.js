import express from "express";
import UserManager from "../dao/UserManager.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = express.Router();

router.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({status:"Error", message:"Usuario y Contraseña incorrectos!"});
    }

    req.session.user = {first_name:req.user.first_name, last_name:req.user.last_name, email:req.user.email, age:req.user.age};
    res.redirect("/products");
});

router.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), async (req, res) => {
    res.redirect("/login");
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
});

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res) => {
    req.session.user = req.user;
    req.session.loggedIn = true;
    res.redirect("/products");
});

export default router;