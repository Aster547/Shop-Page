const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'add-product', 
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(
        title,
        imageURL,
        description,
        price
    );

    product.save();
    res.redirect('/admin/add-product');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        //Calls templating engine
        res.render('admin/products', {
            prods: products, 
            docTitle: 'Admin Products', 
            path: '/admin/products'
        }); 
    });
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll( products => {
        //Calls templating engine
        res.render('shop/orders', {
            prods: products, 
            docTitle: 'Orders', 
            path: '/admin/orders'
        }); 
    });
}