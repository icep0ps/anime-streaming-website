const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schemas = require('../libs/schemas');
const { createToken } = require('../libs/token');

async function signIn(req, res) {
  const { User } = Schemas;
  const { username, password } = req.body;

  try {
    const user = await mongoose.connect(process.env.CONNECTION_STRING).then(async () => {
      return await User.findOne({ username: username })
        .exec()
        .catch((err) => console.log(err));
    });
    if (user) {
      bcrypt.compare(password, user.password, function (err, results) {
        if (err) {
          res.status(400).send('unexpected err ');
        }
        if (results) {
          const token = createToken(user);
          res.cookie('x-access-token', token, { httpOnly: true });
          res.status(200).redirect('/');
        } else {
          res.status(400).send('incorrect password');
        }
      });
    } else {
      res.status(400).send('could not find user');
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = signIn;
