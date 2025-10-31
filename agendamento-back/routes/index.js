var express = require('express');
const { validateJWT } = require('../middlewares/authMiddleware');
var router = express.Router();

router.use(validateJWT);

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).json({ status: 'API is running' });
});


module.exports = router;
