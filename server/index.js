var cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const signIn = require('./controllers/signIn');
const signUp = require('./controllers/signUp');
const { verifyToken } = require('./libs/token');
const signOut = require('./controllers/signOut');
const getTrending = require('./controllers/getTrending');
const isUserLoggedIn = require('./controllers/isLoggedIn');
const { getContinueWatching, addToWatching } = require('./controllers/continueWatching');

const PORT = process.env.PORT || 2000;
const app = express();
const url = process.env.CONNECTION_STRING;

// need the cors options below if trying to send req with "withCredentials: true" in axios
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  await mongoose.connect(url);
}
connectDB();

app.post('/signup', signUp);

app.post('/signin', signIn);

app.get('/isLoggedIn', verifyToken, isUserLoggedIn);

app.get('/signout', signOut);

app.get('/trending', getTrending);

app.get('/continueWatching', getContinueWatching);

app.post('/continueWatching', verifyToken, addToWatching);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
