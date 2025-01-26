//Cart is a collection of products
//A subset of the total products
//A function to add items to cart
//A function to remove items from cart

const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'cart.json'
);



module.exports = class Cart{
//total price = total price + product price
//quantity 
//products[]

//functions:
//addToCart(prodID, price)

//removeFromCart()

    static addToCart(prodID, prodPrice) {
        //retrieve data from file
        //check if the product exists
        //add the product or increase quantity
        //total price always increases
        //cart = {products: products[], totalPrice: number}
        //products[i] = {id: string, qty: number}

        fs.readFile(p, (err, fileContent) => {
            
            let cart = {products: [], totalPrice: 0};
            
            if (!err && fileContent != ''){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === prodID);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id: prodID, qty: 1}
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + + prodPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Added to cart successfully");
            });
        });
    }

    /** How this works:
     * To delete a product we first retrieve cart from cart.json
     * 
     * Then we create another cart object called updatedCart
     * 
     * updatedCart wil have every element except the element with the id specified in parameter 
     * 
     * We get the quantity of the element to be deleted so that we can multiply it by the price
     * 
     * And subtract that from total price
     * 
     */
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }

            const cart = JSON.parse(fileContent);
            
            const updatedCart = {...cart};
            const product = cart.products.find((prod) => prod.id === id);

            //No product in the cart, we don't need to update it
            if (!product)
                return;

            const productQty = product.qty;

            updatedCart.products = cart.products.filter((prod) => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Deleted successfully");             
            });

        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {

            if (err) {
                console.log("Nothing in cart!");
                cb(null); //why not an empty array?
            }

            const cart = JSON.parse(fileContent);

            cb(cart);
        });

    }
}