const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Only fetch the 'name' field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new user
/*router.post('/', async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    const user = await User.create(req.body);
    console.log('Created user:', user);

    res.json(user);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});*/

router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate the request data
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const users = await User.create({ name, email, phone });

    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
