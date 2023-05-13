const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schemas = require('../libs/schemas');
const { createToken } = require('../libs/token');

async function signUp(req, res) {
  const { User } = Schemas;
  const { username, password } = req.body;

  try {
    await mongoose.connect(process.env.CONNECTION_STRING).then(async () => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.status(400).redirect('/signup');
        }
        const user = new User({ username, password: hash });
        user.save().catch((err) => res.status(400).json({ msg: 'err' }));
        const token = createToken(user);
        res.cookie('x-access-token', token, { httpOnly: true });
        res.status(200).redirect('/');
      });
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = signUp;
