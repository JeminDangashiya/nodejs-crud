var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var engine = require("ejs-mate");
var app = express();
const MongoClient = require('mongodb').MongoClient;

const connectionString = "mongodb+srv://jemin:_jemin$dangashiya_@cluster0.ct3jb.mongodb.net/practice_app?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({
    extended: true
}))

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
})


MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).then(client =>{
    console.log("Database is connected");
    const database = client.db('user-registration');
    app.get('/getalluser',(req,res) =>{
        const users = database.collection('ecommerce_users')
        users.find().toArray().then(results => {
                res.status(200).json(results)
            }).catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })
    app.post('/addUsers',(req,res) =>{
        req.body.id = Math.ceil(Math.random()*100000)
        const users = database.collection('ecommerce_users')
        users.insertOne(req.body).then(results => {
                res.status(200).json(results)
            }).catch(error => {
                res.status(400).json({
                    isSuccess: true
                })
            })
    })
    app.post('/getbyID', (req, res) => {
        const users = database.collection('ecommerce_users');
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
    app.post('/deleteUser', (req, res) => {
        const users = database.collection('ecommerce_users');
        users.deleteOne({
                id: parseInt(req.body.id)
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

})

app.listen(8081);
