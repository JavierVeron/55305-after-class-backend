import { userModel } from "./models/user.model.js";

class UserManager {
    async addUser(user) {
        try {
            if (user.email == "adminCoder@coder.com") {
                user.role = "admin";
            }

            await userModel.create(user);
            console.log("User added!");
    
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(user) {
        try {
            const userLogged = await userModel.findOne({email:user}) || null;
            
            if (userLogged) {
                console.log("User logged!");
                return userLogged;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    async restorePassword(user, pass) {
        try {
            const userLogged = await userModel.updateOne({email:user}, {password:pass}) || null;
            
            if (userLogged) {
                console.log("Password Restored!");
                return userLogged;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    /* async getUsers(params) {
        let {limit, page, query, sort} = params
        limit = limit ? limit : 10;
        page = page ? page : 1;
        query = query || {};
        sort = sort ? sort == "asc" ? 1 : -1 : 0;
        let users = await userModel.find({}).lean();

        return users;
    }

    async getUserById(id) {
        if (this.validateId(id)) {
            return await userModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("Not found!");
            
            return null;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    } */
}

export default UserManager;