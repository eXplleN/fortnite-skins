const mongoose = require('mongoose');

const skinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rarity: { type: String, required: true },
  description: { type: String, required: true },
});

const Skin = mongoose.model('Skin', skinSchema);

module.exports = Skin;

