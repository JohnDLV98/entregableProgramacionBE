const { Router } = require('express');
const productsRouter = require('./products/products.routes');
const cartsRouter = require('./carts/carts.routes');

const router = Router();

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);

module.exports = router;