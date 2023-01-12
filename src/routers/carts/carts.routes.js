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

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const addProduct = await managerCarts.addProduct(cartId, productId)
    if(addProduct.error){
        return res.status(400).send({
            status: "error",
            error: addProduct.error
        })
    }
    res.send({
        status: 'success',
        newCart: addProduct
    })
})
    
        
    

module.exports = router;