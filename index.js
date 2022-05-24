const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();


//middleware
app.use(cors());
app.use(express.json());



//connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.noqxg.mongodb.net/?retryWrites=true&w=majority`;

//create a new mongo client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        //connect the client to the server
        await client.connect();
        const reviewCollection = client.db('rock_tyre').collection('review');
        const productCollection = client.db('rock_tyre').collection('product');

        //get review
        app.get('/review', async (req, res) => {
            const query = (0);
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        //get product
        app.get('/product', async (req, res) => {
            const query = (0);
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });


        //Post review
        app.post('/review', async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        });
        //post product
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })
    }
    finally {

    }

}

//call function
run().catch(console.dir);


//creat an api for test the server
app.get('/', (req, res) => {
    res.send('Running Rock Tyre Server')
});

//for listenig the server to run to the port 50000
app.listen(port, () => {
    console.log('Listening to port', port);
});