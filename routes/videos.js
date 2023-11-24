const controller = require('../controllers/videos');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);


module.exports = router;