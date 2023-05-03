const bcrypt = require('bcrypt');
const Schemas = require('../libs/schemas');
const { createToken } = require('../libs/token');

async function signIn(req, res) {
  const { User } = Schemas;
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
}

module.exports = signIn;
