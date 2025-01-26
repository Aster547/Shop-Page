const express = require('express');

const router = express.Router();

//Local
const adminController = require('../controllers/admin');

router.get('/edit-product/:prodID', adminController.getEditProduct);

router.post('/edit-product/:prodID', adminController.postEditProduct);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/orders', adminController.getOrders);


module.exports = router;