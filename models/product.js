const fs = require('fs');
const helpFunction = require('./util/helper-functions');
const data_path = require('./util/data-paths');

const p = data_path.products;

module.exports = class Product{
    constructor(title, imageURL, description, price){
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    //This updates the list of products
    save(){
        this.id = Math.random().toString();
        helpFunction.getProductsFromFile( products => {
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err)
                    console.log("File not saved >:(");
                else    
                    console.log("Save success :3");
            });
        });
    }

    static findById(prodID, cb){

        helpFunction.getProductsFromFile((products) => {
            const product = products.find(product => product.id === prodID);
            cb(product);
        });
    }

    //This fetches all products and places it in the array of the callback function
    static fetchAll(cb){
        helpFunction.getProductsFromFile(cb);
    }
}