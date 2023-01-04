const express = require('express');
const ProductManager = require('./manager/ProductManager');

const PORT = 8080;

const manager = new ProductManager('./Products.json');

const app = express();
    
    //Routes
        app.get('/products', async (req, res) => {
            const products = await manager.getProducts();
            console.log(req.query);
            const limit = req.query.limit;
            if(!req.query.limit){
                return res.send(products);
            }             
                const limitProducts = products.slice(0,+limit);
                res.send(limitProducts);
        });

        app.get('/products/:pid', async (req, res) => {
            console.log(req.params);
            const pId = req.params.pid;
            const product = await manager.getProductById(+pId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }
            res.send(product);
        })

        app.listen(PORT, () => {
            console.log("Listening on Port => ", PORT);
        });  

   