var cors = require('cors');
require('dotenv').config();
var morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const signIn = require('../server/controllers/signIn');
const signUp = require('../server/controllers/signUp');
const { verifyToken } = require('../server/libs/token');
const signOut = require('../server/controllers/signOut');
const getTrending = require('../server/controllers/getTrending');
const isUserLoggedIn = require('../server/controllers/isLoggedIn');
const {
  getContinueWatching,
  addToWatching,
} = require('../server/controllers/continueWatching');

// if not in production use the port 5000
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan('tiny'));

const path = require('path');

// serve up production assets
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route

// need the cors options below if trying to send req with "withCredentials: true" in axios
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}
connectDB();

app.get('/api/isLoggedIn', verifyToken, isUserLoggedIn);

app.get('/api/trending', getTrending);

app.get('/api/continueWatching', verifyToken, getContinueWatching);

app.post('/api/signout', signOut);

app.post('/api/signup', signUp);

app.post('/api/signin', signIn);

app.post('/api/continueWatching', verifyToken, addToWatching);

/* need to put this line below get request or else it will return static html fines see:
https://stackoverflow.com/questions/44289385/html-is-being-sent-instead-of-json-data
*/

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
