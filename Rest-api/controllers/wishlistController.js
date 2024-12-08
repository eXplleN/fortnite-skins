const User = require('../models/User');
const Skin = require('../models/Skin'); 

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('skins');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ skins: user.skins });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const skin = await Skin.findById(req.body.skinId);
    if (!user || !skin) {
      return res.status(404).json({ message: 'User or Skin not found' });
    }
    if (!user.skins.includes(skin._id)) {
      user.skins.push(skin._id);
      await user.save();
      res.status(200).json({ message: 'Skin added to wishlist', skin });
    } else {
      res.status(400).json({ message: 'Skin already in wishlist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const skinId = req.params.skinId;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.skins = user.skins.filter(skin => skin.toString() !== skinId);
    await user.save();
    res.status(200).json({ message: 'Skin removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
