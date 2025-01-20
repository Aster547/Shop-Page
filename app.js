//Third-party
const express = require('express');
const bodyParser = require('body-parser');

//CORE
const path = require('path');

//Middleware
const adminRoute = require('./Routes/admin');
const shopRoute = require('./Routes/shop');

//Controller
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views/pug');


const PORT = 3000;

//listens for streams to parse
app.use(bodyParser.urlencoded({extended: false}));

//Kinda defaults static stuff on public folder
app.use(express.static(path.join(__dirname, 'public')));

//app.use(middlewareFunction) allows us to add middleware
//next is a function which is passed to an asyn function?
//next allows us to go to the next middleware

app.use('/admin', adminRoute); //Add Products
app.use(shopRoute); //Shop

app.use(errorController.get404);

app.listen(PORT);

/*
starting page
View all products listed
create new products
Add products
Delete Products - admin
Add to cart
Checkout page 


*/