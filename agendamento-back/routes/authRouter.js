const authService = require('../services/authService');

const express = require('express');
const router = express.Router();


// Get Token
router.post('/token', function(req, res, next) {
  try {
    authService.generateToken(authService.authDTO(req.body)).then(token => {
      res.status(200).json({ token: token });
    }).catch(error => {
      res.status(401).json({ message: error.message });
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);



module.exports = router;
