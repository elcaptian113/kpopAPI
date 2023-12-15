const controller = require('../controllers/idols');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/group/:value', controller.getByGroup);
router.post('/', upload.single("image"),controller.create);
router.put('/', upload.single("image"),controller.update);
router.delete('/', controller.deleting);

module.exports = router;