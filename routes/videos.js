const controller = require('../controllers/videos');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/group/:value', controller.getByGroup);
router.get('/idol/:value', controller.getByIdol);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.deleting);


module.exports = router;