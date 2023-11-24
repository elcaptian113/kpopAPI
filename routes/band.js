const controller = require('../controllers/band');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/name/:value', controller.getByName)

module.exports = router;