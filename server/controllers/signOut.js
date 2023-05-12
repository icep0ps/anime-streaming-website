function signOut(req, res) {
  try {
    res.clearCookie('x-access-token');
    res.status(401).json({ msg: 'logged out' });
  } catch (err) {
    res.status(500).json({ msg: 'server err' });
  }
}

module.exports = signOut;
