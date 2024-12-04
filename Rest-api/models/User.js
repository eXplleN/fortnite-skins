const mongoose = require('mongoose');
const Skin = require('./Skin'); 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skin' }], 
});

module.exports = mongoose.model('User', userSchema);
