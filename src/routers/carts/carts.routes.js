const { Router } = require('express');
const path = require('path');
const CartManager = require('../../manager/CartManager');
const ProductManager = require('../../manager/ProductManager');

const router = Router();
const managerProducts = new ProductManager(path.resolve(__dirname,'../../data/Products.json'));
const managerCarts = new CartManager(path.resolve(__dirname,'../../data/Carts.json'));


router.post('/', async (req, res) => {   
    const params = req.body;
    if(params.id || params.products){
        return res.status(404).json({
            status: "error",
            error: "don't push parameters"
        });
    }
    await managerCarts.addCart();
    res.json({
        status: "Success",
        data: await managerCarts.getCarts()
    });
});

router.get('/:cid', async (req, res) => {
    const cId = req.params.cid;
    const cart = await managerCarts.getCartById(+cId);
    if (!cart) {
        return res.status(404).json({
            status: "error",
            error: "Cart not found"
        });
    }
    res.json({
        status: "success",
        data: cart.products
    });
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { pid, cid } = req.params;
    const products = await managerProducts.getProducts();
    const carts = await managerCarts.getCarts();

    const product = products.find((product) => product.id === +pid); 
    if(!product){
        return res.status(404).json({
            status: "error",
            error: "Product Not Found"
        })
    };

    const cart = carts.find((cart) => cart.id === +cid);
    if(!cart){
        return res.status(404).json({
            status: "error",
            error: "Cart Not Found"
        });
    };
    let newProperties;
    const productIndex = cart.products.findIndex((item) => item.product === product.id);
    if(productIndex < 0){
           
            
        }
        
    } else {
        
                
        }
    
    await managerCarts.updateCart(+cid, newProperties);
    return res.json({
        status: "Success",
        data: cart.products
    })
   
})
module.exports = router;