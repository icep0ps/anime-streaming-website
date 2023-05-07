const { sign, verify } = require('jsonwebtoken');

function createToken(user) {
  const token = sign({ userId: user._id, username: user.username }, process.env.SECRET, {
    expiresIn: '1d',
  });
  return token;
}

function verifyToken(req, res, next) {
  const token = req.cookies['x-access-token'];
  console.log(token);
  try {
    verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'no user auth' });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(400).json({ message: 'no token found' });
  }
}

module.exports = { createToken, verifyToken };
