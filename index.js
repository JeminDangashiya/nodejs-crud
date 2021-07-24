var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
const MongoClient = require('mongodb').MongoClient;

const connectionString = "mongodb+srv://jemin:_jemin$dangashiya_@cluster0.ct3jb.mongodb.net/practice_app?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
})

// connect node to mongodb
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to Database')
    const db = client.db('practice_app')


    app.get('/getAllUsers', (req, res) => {
        const users = db.collection('ecommerce_users');
        users.find().toArray()
            .then(results => {
                res.status(200).json(results)
            })
            .catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })

    app.post('/addUsers', (req, res) => {
        req.body.Id = Math.ceil(Math.random() * 100000)
        const users = db.collection('ecommerce_users');
        users.insertOne(req.body)
            .then(results => {
                res.status(200).json({
                    isSuccess: true
                })
            })
            .catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })

    app.post('/getbyID', (req, res) => {
        const users = db.collection('ecommerce_users');
        users.findOne({
                Id: parseInt(req.body.Id)
            })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })

    app.post('/updateUser', (req, res) => {
        const users = db.collection('ecommerce_users');
        users.updateOne({
                Id: parseInt(req.body.Id)
            }, {
                $set: {
                    Name: req.body.Name,
                    Age: req.body.Age,
                    State: req.body.State,
                    Country: req.body.Country,
                }
            })
            .then(results => {
                res.status(200).json({
                    isSuccess: true
                })
            })
            .catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })

    app.post('/deleteUser', (req, res) => {
        const users = db.collection('ecommerce_users');
        users.deleteOne({
                Id: parseInt(req.body.Id)
            })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })

});

app.listen(8080);