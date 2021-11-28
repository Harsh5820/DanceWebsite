const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port = 8000;


//Defining mongoose schemas
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model('contact', contactschema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
});

app.get('/classinfo', (req, res) => {
    const params = {}
    res.status(200).render('classinfo.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(404).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port, () =>{
    console.log('The application is running sucessfully in port 8000');
});