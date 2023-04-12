var cors = require('cors');
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env.PORT || 3000;
const app = express();
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());

app.get('/trending', async (req, res) => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const data = [];
    const database = client.db('meta');
    const trending = await database.collection('trending');
    await trending.find().forEach((anime) => data.push(anime));
    res.json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('sorry an unexpected error occured');
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
