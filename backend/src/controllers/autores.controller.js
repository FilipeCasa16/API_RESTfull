const autoresService = require('../services/autores.service');

function list(req, res) {
  try {
    const data = autoresService.listAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

function create(req, res) {
  try {
    const novo = autoresService.createAutor(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

module.exports = { list, create };
