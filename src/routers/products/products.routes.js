const { Router } = require('express');
const path = require('path');
const ProductManager = require('../../manager/ProductManager');

const router = Router();
const manager = new ProductManager(path.resolve(__dirname,'../../data/Products.json'));

    router.get('/', async (req, res) => {
        const products = await manager.getProducts();
        
        const limit = req.query.limit;        

            if(req.query.limit){
                if(+limit <= products.length){
                    const limitProducts = products.slice(0,+limit);
                    return res.json({
                        status: "Success",
                        data: limitProducts
                    });
                    
                } else {
                    return res.status(404).json({
                    status: "error",
                    error: "There isn't that many products"
                    });
                }
            }      
            res.json({
                status: "Success",
                data: products
            });
    });

    router.get('/:pid', async (req, res) => {
        
        const pId = req.params.pid;
        const product = await manager.getProductById(+pId);        
        if (!product) {
            return res.status(404).json({
                status: "error",
                error: "Product not found"
            });
        }
        res.json({
            status: "success",
            data: product
        });
    })

    router.post('/', async (req, res) => {
        const product = req.body;
        if(!(product.title && product.description && product.code && product.price && product.stock && product.category) || req.body.id){
            return res.status(404).json({
                status: "error",
                error: "wrong data"
            })
        }
        await manager.addProduct(product);
        const products = await manager.getProducts();
        console.log(product);        
        res.json({
            status: "Success",
            data: products
        })
    });

    router.put('/:pid', async (req, res) => {
        const pId = req.params.pid;
        const newProperties = req.body;
        const product = await manager.getProductById(+pId); 
        if (!product || req.body.id) {
            return res.status(404).json({
                status: "error",
                error: "Data error"
            });
        }
        await manager.updateProduct(+pId, newProperties);
        res.json({
            status: "Success", 
            data: await manager.getProductById(+pId)
        });
    });

    router.delete('/:pid', async (req, res) => {
        const pId = req.params.pid;
        const product = await manager.getProductById(+pId); 
        if (!product) {
            return res.status(404).json({
                status: "error",
                error: "Product not found"
            });
        }
        await manager.deleteProduct(+pId);
        res.json({
            status: "success",
            data: product
        });
    });

module.exports = router;