const mongoose = require('mongoose');
const Schemas = require('../libs/schemas');

async function addToWatching(req, res) {
  const { User } = Schemas;
  const userId = req.user.userId;
  const body = req.body.arg;

  try {
    await mongoose.connect(process.env.CONNECTION_STRING).then(async () => {
      const user = await User.findOne({ _id: userId });
      const userHasWatchedAnime = user.continueWatching.some(
        (anime) => anime.id === body.id
      );

      if (userHasWatchedAnime) {
        await User.findOneAndUpdate(
          { _id: userId, 'continueWatching.id': body.id },
          { $set: { 'continueWatching.$.continueFrom': body.continueFrom } }
        );
      } else {
        await User.findOneAndUpdate(
          { _id: userId },
          { $push: { continueWatching: body } }
        );
      }
      res.status(200).json({ msg: 'saved' });
    });
  } catch (err) {
    console.log(err);
  }
}

async function getContinueWatching(req, res) {
  const { User } = Schemas;
  try {
    await mongoose.connect(process.env.CONNECTION_STRING).then(async () => {
      const userId = req.user.userId;
      const watching = await User.findOne(
        { _id: userId },
        { _id: 0, continueWatching: 1 }
      );
      res.status(200).json({ data: [...watching.continueWatching] });
    });
  } catch (err) {
    res.status(403).json({ msg: `user not authed ${err}` });
  }
}

module.exports = { addToWatching, getContinueWatching };
