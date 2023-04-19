const mongoose = require('mongoose');

const User = mongoose.model(
  'users',
  new mongoose.Schema({
    username: String,
    password: String,
    continueWatching: [],
    joinedDate: { type: Date, default: Date.now },
  })
);

const Anime = mongoose.Schema({
  id: String,
  title: String,
  url: String,
  image: String,
  releaseDate: { type: [Date, null] },
  description: { type: [String, null] },
  genres: [String],
  subOrDub: { type: String, enum: ['sub', 'dub'] },
  type: { type: [String, null] },
  status: String,
  otherName: { type: [String, null] },
  totalEpisodes: Number,
  episodes: [
    {
      id: String,
      number: Number,
      url: String,
    },
  ],
});

const ContinueWatchingAnime = mongoose.Schema({
  id: String,
  title: String,
  url: String,
  image: String,
  releaseDate: { type: [Date, null] },
  description: { type: [String, null] },
  genres: [String],
  subOrDub: { type: String, enum: ['sub', 'dub'] },
  type: { type: [String, null] },
  status: String,
  otherName: { type: [String, null] },
  totalEpisodes: Number,
  episodes: [
    {
      id: String,
      number: Number,
      url: String,
    },
  ],
  continueFrom: String,
});

module.exports = { User, Anime, ContinueWatchingAnime };
