const mongoose = require('mongoose');

const skinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rarity: { type: String, required: true },
  description: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skin', skinSchema);
