const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Skin = require('../models/Skin');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.status(201).json({
      message: 'Registration successful!',
      token, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email }, 
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};

const getUserProfile = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).populate('skins');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };