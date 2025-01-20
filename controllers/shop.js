const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        //Calls templating engine
        res.render('shop/product-list', {
            prods: products, 
            docTitle:  'All Products', 
            path: '/products'
        }); 
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll( products => {
        //Calls templating engine
        res.render('shop/index', {
            prods: products, 
            docTitle: 'Shop', 
            path: '/'
        }); 
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart', 
        path: '/cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodID = req.body.prodID;

    Product.findById(prodID, (product => {

    }));

    res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path:'/checkout'
    })
}
//Why is prodID undefined?
//Why does it go to the prodID route when removing res.redirect()?
exports.getProduct= (req, res, next) => {
    const prodID = req.params.productID;

    Product.findById(prodID, (product) => {
        res.render('shop/product-detail', {
            docTitle: product.title,
            path: 'products/product-detail',
            product: product
        });
    });
}