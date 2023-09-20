import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const JWTStrategy = jwt.Strategy;
const LocalStrategy = local.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("login", new LocalStrategy({passReqToCallback:true, usernameField:"email", session:false}, async (req, username, password, done) => {
        const {email, pass} = req.body;
        try {
            let user = await userModel.findOne({email:username});

            if (!user) {
                console.log("Error! El usuario no existe!");
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log("Error! La contraseña es inválida!");
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField:"email"}, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;

        try {
            let user = await userModel.findOne({email:username});

            if (user) {
                console.log("El usuario " + email + " ya se encuentra registrado!");
                return done(null, false);
            }

            user = {first_name, last_name, email, age, password:createHash(password)};

            if (user.email == "adminCoder@coder.com") {
                user.role = "admin";
            }

            let result = await userModel.create(user);

            if (result) {
                return done(null, result);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:"S3CR3T0"
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
};

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }

    return token;
}

export default initializePassport;