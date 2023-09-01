import express from "express";
import UserManager from "../dao/UserManager.js";

const router = express.Router();
const UM = new UserManager();

router.get("/login", async (req, res) => {
    let {user, pass} = req.query;
    const userLogged = await UM.login(user, pass);

    if (userLogged) {
        res.send({status:"OK", message:userLogged});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo loguear el Usuario!"});
    }
});

router.post("/register", async (req, res) => {
    const userRegistered = await UM.addUser(req.body);

    if (userRegistered) {
        res.send({status:"OK", message:userRegistered});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo registrar el Usuario!"});
    }
});

export default router;