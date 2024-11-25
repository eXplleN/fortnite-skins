const mongoose = require('mongoose');

const skinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rarity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Skin = mongoose.model('Skin', skinSchema); 

module.exports = Skin;

