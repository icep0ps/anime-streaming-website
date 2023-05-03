function signOut(req, res) {
  res.clearCookie('x-access-token');
  res.status(200).redirect('http://localhost:3000/');
}

module.exports = signOut;
