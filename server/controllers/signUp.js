const bcrypt = require('bcrypt');
const Schemas = require('../libs/schemas');
const { createToken } = require('../libs/token');

function signUp(req, res) {
  const { User } = Schemas;
  const { username, password } = req.body;

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
}
module.exports = signUp;
