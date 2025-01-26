const Product = require('../models/product');
const Cart = require('../models/cart');

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
    const prodPrice = req.body.price;

    Cart.addToCart(prodID, prodPrice);

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

exports.deleteCartProduct = (req, res, next) => {
    const prodID = req.body.prodID;

    Product.findById(prodID, (product) => {
        Cart.deleteProduct(prodID, product.price);

        res.redirect('/cart');
    });
    
}

//Gets the properties we need from Product
exports.getCart = (req, res, next) => {

    /** What I'm doing:
     * 
     * Get cart[]
     * Get products[]
     * Iterate through products[]
     * Push in cartProducts[] if the id of a product in products[] exists in cart[]
     * cartProduct = {productInCart, productInCart, ...}
     * productInCart = {}
     */

    /** CART
     *
     * cart = {products: products[], totalPrice: number} 
     * 
     * products[i] = {id: string, qty: number}
     */

    /** PRODUCT
     * 
     * productList = {[product, product, ...]}
     * 
     * product = {id: string, title: string, imageURL: string, description:string, price: number}
     */

    const cartProducts = [];

    Cart.getCart(cart => {

        Product.fetchAll(products => {

            for (product of products) {

                const cartProduct = cart.products.find(cartProd => cartProd.id === product.id);

                if (cartProduct) {
                    cartProducts.push({productData: product, qty: cartProduct.qty});
                }
            }

            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}