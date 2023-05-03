const { MongoClient, ServerApiVersion } = require('mongodb');

const url = process.env.CONNECTION_STRING;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getTrending(req, res) {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });

    const data = [];
    const database = client.db('meta');
    const trending = await database.collection('trending');
    await trending.find().forEach((anime) => data.push(anime));
    res.json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('sorry an unexpected error occured');
  }
}
module.exports = getTrending;
