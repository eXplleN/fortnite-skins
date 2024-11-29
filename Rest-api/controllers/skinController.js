const Skin = require('./models/skin');


const getAllSkins = async (req, res) => {
  try {
    const skins = await Skin.find();
    res.json(skins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skins', error: err });
  }
};


const getSkinById = async (req, res) => {
  try {
    const skin = await Skin.findById(req.params.id);
    if (!skin) return res.status(404).json({ message: 'Skin not found' });
    res.json(skin);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skin', error: err });
  }
};


const createSkin = async (req, res) => {
  try {
    const newSkin = new Skin(req.body);
    await newSkin.save();
    res.status(201).json(newSkin);
  } catch (err) {
    res.status(400).json({ message: 'Error creating skin', error: err });
  }
};


const updateSkin = async (req, res) => {
  try {
    const updatedSkin = await Skin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkin) return res.status(404).json({ message: 'Skin not found' });
    res.json(updatedSkin);
  } catch (err) {
    res.status(400).json({ message: 'Error updating skin', error: err });
  }
};


const deleteSkin = async (req, res) => {
  try {
    const deletedSkin = await Skin.findByIdAndDelete(req.params.id);
    if (!deletedSkin) return res.status(404).json({ message: 'Skin not found' });
    res.json({ message: 'Skin deleted', skin: deletedSkin });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skin', error: err });
  }
};

module.exports = { getAllSkins, getSkinById, createSkin, updateSkin, deleteSkin };
