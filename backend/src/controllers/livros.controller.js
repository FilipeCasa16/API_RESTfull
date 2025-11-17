const livrosService = require('../services/livros.service');

function list(req, res) {
  try {
    const data = livrosService.listAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

function getById(req, res) {
  try {
    const livro = livrosService.findById(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(200).json(livro);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

function create(req, res) {
  try {
    const novo = livrosService.createLivro(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

function update(req, res) {
  try {
    // PUT -> atualizar recurso inteiro (aqui aceitaremos atualização parcial também, mas sem criar novo)
    const atualizado = livrosService.updateLivro(req.params.id, req.body);
    res.status(200).json(atualizado);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

function remove(req, res) {
  try {
    livrosService.deleteLivro(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
  }
}

module.exports = { list, getById, create, update, remove };
