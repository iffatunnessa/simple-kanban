const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
var app = express()

const MongoClient = require('mongodb').MongoClient;
const { connect } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("server is working");
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ew9hc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log('db connected');
    console.log(err);
    const todoCollection = client.db('simpleKanban').collection("todo");
    //post
    app.post('/addTask', (req, res) => {
        const newItem = req.body;
        console.log(newItem)
        todoCollection.insertOne(newItem).then(result => {
            console.log("inserted count", result.insertedCount)
            res.send(result.insertedCount > 0)
            console.log('res', result);
        })
        console.log('add', newItem);
    })
    //get
    app.get('/todo', (req, res) => {
        todoCollection.find()
            .toArray((err, newItems) => {
                res.send(newItems);
            })
    })
    //update
    app.patch('/update', (req, res) => {
        console.log( req.body, req.query.state)
        todoCollection.updateOne({ state: req.query.state},
            {
                $set: { items: req.body }
            })
            .then(items => {
                res.send(items);
                console.log(items)
            })
    })
});

app.listen(process.env.PORT || 5000);