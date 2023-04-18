var cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const Schemas = require('./libs/schemas');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const { createToken, verifyToken } = require('./libs/token');
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env.PORT || 2000;
const app = express();
const url = process.env.CONNECTION_STRING;

// need the cors options below if trying to send req with "withCredentials: true" in axios
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { User, Anime } = Schemas;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  await mongoose.connect(url);
}
connect();

app.get('/trending', async (req, res) => {
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
  } finally {
    await client.close();
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      res.status(400).redirect('/');
    }
    const user = new User({ username, password: hash });
    user.save().catch((err) => res.status(400).redirect('/'));
    res.status(200).redirect('/');
  });
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username }).exec();
  if (user) {
    bcrypt.compare(password, user.password, function (err, results) {
      if (err) {
        res.status(400).send('unexpected err ');
      }
      if (results) {
        const token = createToken(user);
        res.cookie('x-access-token', token, { httpOnly: true });
        res.status(200).redirect('http://localhost:3000/');
      } else {
        res.status(400).send('incorrect password');
      }
    });
  } else {
    res.status(400).send('could not find user');
  }
});

app.get('/isLoggedIn', verifyToken, async (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ user: undefined });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
