const fs = require('fs/promises');
const { existsSync } = require('fs' );

class ProductManager {
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
    
    async getProducts() {
        try {
            if(existsSync(this.path)) {
                const dataProducts = await this.readFile();
                const products = JSON.parse(dataProducts);
                return products
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
        
    }
   
    async addProduct(product) {
        try {
            const products = await this.getProducts();
                if (!products.length) {
                    ProductManager.idCounter = 1;
                } else {
                    ProductManager.idCounter= products[products.length -1].id + 1;            
                }
            const newProduct = {
                id: ProductManager.idCounter,
                ...product
            };
            products.push(newProduct);
            const productString = await JSON.stringify(products, null, "\t");
            await this.writeFile(productString); 
            return newProduct;   
        } catch (error) {
            throw new Error(error);
        }
    }    
   
    async getProductById(idProduct) {

        try {
            const products = await this.getProducts();
            const foundProduct = products.find( element => element.id === idProduct);
            if(!foundProduct) {
                throw new Error("Not Found")
            }

            return foundProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(idProduct, newProperties) {
        const products = await this.getProducts();
        const foundProductById = await this.getProductById(idProduct);

        const productUpdated = {...foundProductById, ...newProperties};

        const replacedProductList = products.map( product => {
           if (product.id === productUpdated.id) {
                return productUpdated;
            } else {
                return product;
            } 
        });

        const stringProductsList = await JSON.stringify(replacedProductList, null, "\t");

        await this.writeFile(stringProductsList);

        return stringProductsList;
    }

    async deleteProduct(idProduct) {
        const products = await this.getProducts();
        const foundProductById = await this.getProductById(idProduct);
        const foundIndex = products.findIndex( (product) => product.id === foundProductById.id);
        products.splice(foundIndex, 1);

        const stringProductsList = await JSON.stringify(products, null, "\t");

        await this.writeFile(stringProductsList);

        return stringProductsList;
    }
}


module.exports = ProductManager;