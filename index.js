const express = require('express');
const cors = require('cors');
require('dotenv').config()


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.POST || 3000;


// middleware 
app.use(cors())
app.use(express.json())


  

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rxtju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const cowCollection = client.db("cowDb").collection('cow');

    app.get('/cow', async(req,res) => {
        const cursor = cowCollection.find()
        const result = await cursor.toArray();
        res.send(result)
   })

   app.get('/cow/:id', async(req,res) => {

   })
    

    app.post('/cow' ,async (req,res) => {
        const newCow = req.body
        const result = await cowCollection.insertOne(newCow)
        res.send(result)
    })


    app.delete('/cow/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await cowCollection.deleteOne(query)
        console.log(result)
    })
    





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


//   cowMaster
// kWByfurmeZwOk3f5