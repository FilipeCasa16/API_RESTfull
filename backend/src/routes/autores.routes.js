const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');

router.get('/', autoresController.list);
router.post('/', autoresController.create);
router.put('/:id', autoresController.update);
router.delete('/:id', autoresController.remove);

module.exports = router;
