const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const router = require('./router')

const app = express();

const port = process.env.PORT || 3000;

// Body-parser parses is an HTTP request body that usually 
// helps when you need to know more than just the URL being hit.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//  load static asset for style.css
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/asset',express.static(path.join(__dirname,'public/asset')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true 
}))

app.use('/route', router)

//  home route
app.get('/', (req,res) => {
    res.render('base', {title: "Login System"});
})

app.listen(port,() => {
    console.log("Your port is http://localhost:3000");
})