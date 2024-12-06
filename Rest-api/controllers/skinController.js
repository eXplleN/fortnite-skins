const Skin = require('../models/Skin');

const getAllSkins = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : null;
    const filter = userId && req.query.creator ? { creator: userId } : {}; 

    const skins = await Skin.find(filter).sort({ _id: -1 });

    res.json(skins); 
  } catch (err) {
    console.error('Error fetching skins:', err);
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
    const { name, image, rarity, description } = req.body;

    if (!name || !image || !rarity || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newSkin = new Skin({
      name,
      image,
      rarity,
      description,
      creator: req.user.userId, 
    });

    const savedSkin = await newSkin.save();
    res.status(201).json({ message: 'Skin created successfully!', skin: savedSkin });
  } catch (err) {
    res.status(500).json({ message: 'Error creating skin.', error: err.message });
  }
};

const updateSkin = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const skin = await Skin.findById(req.params.id);

    if (!skin) return res.status(404).json({ message: 'Skin not found' });

    if (skin.creator.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this skin' });
    }

    const { name, image, rarity, description } = req.body;
    const updatedSkin = await Skin.findByIdAndUpdate(
      req.params.id,
      { name, image, rarity, description },
      { new: true }
    );

    res.json(updatedSkin);
  } catch (err) {
    res.status(500).json({ message: 'Error updating skin', error: err.message });
  }
};

const deleteSkin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const skin = await Skin.findById(req.params.id);

    if (!skin) return res.status(404).json({ message: 'Skin not found' });

    if (skin.creator.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this skin' });
    }

    await Skin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skin', error: err.message });
  }
};

const getUserSkins = async (req, res) => {
  try {
    const userId = req.user.userId; 
    
    const userSkins = await Skin.find({ creator: userId }).sort({ _id: -1 }); 

    res.json(userSkins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user skins', error: err.message });
  }
};

module.exports = { 
  getAllSkins, 
  getSkinById, 
  createSkin, 
  updateSkin, 
  deleteSkin, 
  getUserSkins 
};
