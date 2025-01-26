//CORE MODULES
const express = require('express');

//LOCAL
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart/delete-item', shopController.deleteCartProduct);

router.get('/checkout', shopController.getCheckout);
 
module.exports = router; 