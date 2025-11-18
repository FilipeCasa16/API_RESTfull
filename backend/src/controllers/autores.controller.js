const db = require('../database');

// LISTAR
function list(req, res) {
  db.query('SELECT * FROM autores', (erro, resultado) => {
    if (erro) return res.status(500).json({ error: erro });
    res.json(resultado);
  });
}

// CRIAR
function create(req, res) {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Campo nome é obrigatório" });
  }

  db.query(
    'INSERT INTO autores (nome) VALUES (?)',
    [nome],
    (erro, resultado) => {
      if (erro) return res.status(500).json({ error: erro });

      res.status(201).json({
        id: resultado.insertId,
        nome,
      });
    }
  );
}

// EDITAR
function update(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  db.query(
    'UPDATE autores SET nome=? WHERE id=?',
    [nome, id],
    (erro) => {
      if (erro) return res.status(500).json({ error: erro });

      res.json({ id, nome });
    }
  );
}

// EXCLUIR
function remove(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM autores WHERE id = ?', [id], (erro) => {
    if (erro) return res.status(500).json({ error: erro });

    res.status(204).send();
  });
}

module.exports = { list, create, update, remove };
