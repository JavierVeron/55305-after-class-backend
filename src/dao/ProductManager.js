import { productModel } from "./models/product.model.js";

class ProductManager {
    async addProduct(product) {
        try {
            if (await this.validateCode(product.code)) {
                console.log("Error! Code exists!");
    
                return false;
            } else {
                await productModel.create(product)
                console.log("Product added!");
    
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async updateProduct(id, product) {
        try {
            if (this.validateId(id)) {   
                if (await this.getProductById(id)) {
                    await productModel.updateOne({_id:id}, product);
                    console.log("Product updated!");
        
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.log("Not found!");
    
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.validateId(id)) {    
                if (await this.getProductById(id)) {
                    await productModel.deleteOne({_id:id});
                    console.log("Product deleted!");
    
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.log("Not found!");
    
            return false;
        }
    }

    async getProducts(limit) {
        return await limit ? productModel.find().limit(limit).lean() : productModel.find().lean();
    }

    async getProductById(id) {
        if (this.validateId(id)) {
            return await productModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("Not found!");
            
            return null;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }

    async validateCode(code) {
        return await productModel.findOne({code:code}) || false;
    }
}

export default ProductManager;