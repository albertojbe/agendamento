var express = require('express');
var router = express.Router();

const userService = require('../services/userService');

// Find User by ID
router.get('/:id', function(req, res, next) {
  try {
    const userId = req.params.id;
    userService.findUserById(userId)
      .then(user => {
        if (user !== null) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create User
router.post('/', function(req, res, next) {
  try {
    const userDTO = userService.createUserDTO(req.body);
    console.log(userDTO);
    userService.createUser(userDTO)
      .then(newUser => {
        res.status(201).json(newUser);
      })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.put('/:id', function(req, res, next) {
  try {
    const userId = req.params.id;
    const userDTO = userService.createUserDTO(req.body);
    userService.updateUser(userId, userDTO)
      .then(updatedUser => {
        if (updatedUser) {
          res.json(updatedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
router.delete('/:id', function(req, res, next) {
  try {
    const userId = req.params.id;
    userService.deleteUser(userId)
      .then(deleted => {
        if (deleted) {
          res.json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }})
      } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
