// livros.routes.js
const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livros.controller');

// ROTAS CERTAS
router.get('/', livrosController.list);
router.get('/:id', livrosController.getById);
router.post('/', livrosController.create);
router.put('/:id', livrosController.update);
router.delete('/:id', livrosController.remove);

module.exports = router;
