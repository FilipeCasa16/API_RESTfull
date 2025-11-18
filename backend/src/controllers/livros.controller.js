const db = require('../database');

// LISTAR TODOS
function list(req, res) {
  db.query('SELECT * FROM livros', (erro, resultado) => {
    if (erro) return res.status(500).json({ error: erro });
    res.json(resultado);
  });
}

// BUSCAR POR ID
function getById(req, res) {
  const { id } = req.params;
  db.query('SELECT * FROM livros WHERE id = ?', [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ error: erro });
    if (resultado.length === 0)
      return res.status(404).json({ error: 'Livro não encontrado' });

    res.json(resultado[0]);
  });
}

// CRIAR LIVRO (com mapeamento autorId -> autor_id e ano -> ano_publicacao)
function create(req, res) {
  console.log("BODY RECEBIDO NO CREATE:", req.body);

  let { titulo, autor_id, ano_publicacao, genero, autorId, ano, genre } = req.body;

  // Aceitar nomes alternativos vindos do front
  if (!autor_id && autorId) autor_id = autorId;
  if (!ano_publicacao && ano) ano_publicacao = ano;
  if (!genero && genre) genero = genre;

  db.query(
    'INSERT INTO livros (titulo, autor_id, ano_publicacao, genero) VALUES (?, ?, ?, ?)',
    [titulo, autor_id, ano_publicacao, genero],
    (erro, resultado) => {
      if (erro) return res.status(500).json({ error: erro });

      res.status(201).json({
        id: resultado.insertId,
        titulo,
        autor_id,
        ano_publicacao,
        genero
      });
    }
  );
}


// ATUALIZAR LIVRO (corrigido e compatível com o front)
function update(req, res) {
  console.log("BODY RECEBIDO NO UPDATE:", req.body);

  const { id } = req.params;

  let { titulo, autor_id, ano_publicacao, genero, autorId, ano, genre } = req.body;

  if (!autor_id && autorId) autor_id = autorId;
  if (!ano_publicacao && ano) ano_publicacao = ano;
  if (!genero && genre) genero = genre;

  db.query(
    `UPDATE livros 
       SET titulo = COALESCE(?, titulo),
           autor_id = COALESCE(?, autor_id),
           ano_publicacao = COALESCE(?, ano_publicacao),
           genero = COALESCE(?, genero)
     WHERE id = ?`,
    [titulo, autor_id, ano_publicacao, genero, id],
    (erro) => {
      if (erro) return res.status(500).json({ error: erro });

      res.json({ id, titulo, autor_id, ano_publicacao, genero });
    }
  );
}


// REMOVER
function remove(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM livros WHERE id = ?', [id], (erro) => {
    if (erro) return res.status(500).json({ error: erro });
    res.status(204).send();
  });
}

module.exports = { list, getById, create, update, remove };
