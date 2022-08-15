const express = require('express')
const router = express.Router();

const products = require('./productsRouter')
const cart = require('./cartRouter');

//middlewares
router.use('/api/products', products)
router.use('/api/cart', cart);

module.exports = router;