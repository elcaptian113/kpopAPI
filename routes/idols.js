const controller = require('../controllers/idols');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);


module.exports = router;