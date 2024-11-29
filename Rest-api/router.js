const express = require('express');
const router = express.Router();
const Skin = require('./models/Skin'); 


router.get('/skins', (req, res) => {
  Skin.find()
    .sort({ _id: -1 })  
    .exec((err, skins) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching skins', error: err });
      }
      res.status(200).json(skins);
    });
});


router.get('/skins/:id', async (req, res) => {
  try {
    const skin = await Skin.findById(req.params.id);
    if (!skin) {
      return res.status(404).json({ message: 'Skin not found' });
    }
    res.json(skin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/skins', async (req, res) => {
  try {
    const { name, rarity, description, image } = req.body;
    const newSkin = new Skin({ name, rarity, description, image });
    await newSkin.save();
    res.status(201).json(newSkin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/skins/:id', async (req, res) => {
  try {
    const { name, rarity, description, image } = req.body;
    const updatedSkin = await Skin.findByIdAndUpdate(
      req.params.id,
      { name, rarity, description, image },
      { new: true }
    );

    if (!updatedSkin) {
      return res.status(404).json({ message: 'Skin not found' });
    }

    res.json(updatedSkin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/skins/:id', async (req, res) => {
  try {
    const deletedSkin = await Skin.findByIdAndDelete(req.params.id);
    if (!deletedSkin) {
      return res.status(404).json({ message: 'Skin not found' });
    }
    res.json({ message: 'Skin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
