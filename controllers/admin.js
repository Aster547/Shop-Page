const Product = require('../models/product');


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode){
        return res.redirect('/');
    }
    
    Product.findById(req.params.prodID, (product) => {
        
        if (product){
            
            res.render('admin/edit-product', {
                docTitle: 'edit-product', 
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        }
        else {
            return res.redirect('/');
        }
    });
}

exports.postEditProduct = (req, res, next) => {
    //create new product with values passed from form
    //save the product

    const prodID = req.params.prodID;
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;

    const updatedProduct = new Product(
        prodID,
        title,
        imageURL,
        description,
        price
    );

    updatedProduct.save();

    res.redirect('/admin/products');
}


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
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
        null,
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

exports.postDeleteProduct = (req, res, next) => {
    //Use the id to get the product
    //Retrieve data from file
    //Place in an array
    //Filter the array to not include product specified by id
    //writeFile with array

    const prodID = req.body.prodID;

    Product.deleteById(prodID);

    res.redirect('/admin/products');
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