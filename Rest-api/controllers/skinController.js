const Skin = require('../models/Skin'); 

exports.getAllSkins = async (req, res) => {
    try {
        const skins = await Skin.find(); 
        res.status(200).json(skins); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch skins' });
    }
};


exports.createSkin = async (req, res) => {
    try {
        const { name, rarity, price } = req.body; 
        const newSkin = new Skin({ name, rarity, price }); 
        const savedSkin = await newSkin.save(); 
        res.status(201).json(savedSkin); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create skin' });
    }
};


exports.getSkinById = async (req, res) => {
    try {
        const { id } = req.params; 
        const skin = await Skin.findById(id); 
        if (!skin) {
            return res.status(404).json({ message: 'Skin not found' });
        }
        res.status(200).json(skin); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch skin' });
    }
};


exports.updateSkin = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body; 
        const updatedSkin = await Skin.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSkin) {
            return res.status(404).json({ message: 'Skin not found' });
        }
        res.status(200).json(updatedSkin); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update skin' });
    }
};


exports.deleteSkin = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedSkin = await Skin.findByIdAndDelete(id); 
        if (!deletedSkin) {
            return res.status(404).json({ message: 'Skin not found' });
        }
        res.status(200).json({ message: 'Skin deleted successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete skin' });
    }
};
