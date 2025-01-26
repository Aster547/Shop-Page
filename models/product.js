const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);


getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err){
            cb([]);
        }

        else {
            cb(JSON.parse(fileContent));
        }
            
        
    });
}

module.exports = class Product{
    constructor(id, title, imageURL, description, price){
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    //This updates the list of products
    save(){
        getProductsFromFile( products => {

            if (this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                let updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    if (err)
                        console.log("File not saved >:(");
                    else    
                        console.log("Save success :3");                    
                });                
            }
            else {
                this.id = Math.random().toString();
                
                products.push(this);

                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if (err)
                        console.log("File not saved >:(");
                    else    
                        console.log("Save success :3");
                });

            }
        });
    }

    static deleteById(prodID) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => prod.id === prodID);
            const updatedProducts = products.filter(prod => prod.id !== prodID);

            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {

                    Cart.deleteProduct(prodID, product.price);
                }
            });
        });
    }

    static findById(prodID, cb){

        getProductsFromFile((products) => {
            const product = products.find(product => product.id === prodID);
            cb(product);
        });
    }

    //This fetches all products and places it in the array of the callback function
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}