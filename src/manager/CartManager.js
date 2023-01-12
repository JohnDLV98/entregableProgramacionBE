const fs = require('fs/promises');
const { existsSync } = require('fs');

class CartManager {
    static idCounter = 0;
    constructor(path) {
        this.path = path
    }

    async readFile(){
        return await fs.readFile(this.path, 'utf-8');
    }

    async writeFile(string){
        return await fs.writeFile(this.path, string, 'utf-8');
    }

    async getCarts() {
        try {
            if(existsSync(this.path)) {
                const dataCarts = await this.readFile();
                const carts = JSON.parse(dataCarts);
                return carts
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async addCart() {
        try {
            const carts = await this.getCarts();
                if (!carts.length) {
                    CartManager.idCounter = 1;
                } else {
                    CartManager.idCounter= carts[carts.length -1].id + 1;            
                }
            const newCart = {
                id: CartManager.idCounter,                
                products: []
            };
            carts.push(newCart);
            const cartString = await JSON.stringify(carts, null, "\t");
            await this.writeFile(cartString); 
              
        } catch (error) {
            throw new Error(error);
        }
    } 

    async getCartById(idCart) {

        try {
            const carts = await this.getCarts();
            const foundCart = carts.find( element => element.id === idCart);
            return foundCart;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async updateCart(idCart, newProperties) {
        const carts = await this.getCarts();
        const foundCartById = await this.getCartById(idCart);

        const cartUpdated = {...foundCartById, ...newProperties};

        const replacedCartList = carts.map( cart => {
           if (cart.id === cartUpdated.id) {
                return cartUpdated;
            } else {
                return cart;
            } 
        });

        const stringProductsList = await JSON.stringify(replacedCartList, null, "\t");

        await this.writeFile(stringProductsList);

        
    }
}

module.exports = CartManager;