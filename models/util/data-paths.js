const path = require('path');


exports.products = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);

exports.cart = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'cart.json'
);
