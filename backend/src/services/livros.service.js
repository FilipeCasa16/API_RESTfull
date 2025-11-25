let livros = [
  { id: 1, titulo: 'Dom Casmurro', autorId: 1, ano: 1899, genero: 'Romance' },
  { id: 2, titulo: 'A Hora da Estrela', autorId: 2, ano: 1977, genero: 'Romance' }
];
let nextId = livros.length + 1;

function listAll() {
  return livros;
}

function findById(id) {
  return livros.find(l => l.id === Number(id));
}

function createLivro(data) {
  const { titulo, autorId, ano, genero } = data || {};
  if (!titulo || !autorId) throw { status: 400, message: 'titulo e autorId são obrigatórios' };
  const novo = { id: nextId++, titulo, autorId: Number(autorId), ano, genero };
  livros.push(novo);
  return novo;
}

function updateLivro(id, data) {
  const livro = findById(id);
  if (!livro) throw { status: 404, message: 'Livro não encontrado' };

  const { titulo, autorId, ano, genero } = data;
  if (titulo !== undefined) livro.titulo = titulo;
  if (autorId !== undefined) livro.autorId = Number(autorId);
  if (ano !== undefined) livro.ano = ano;
  if (genero !== undefined) livro.genero = genero;
  return livro;
}

function deleteLivro(id) {
  const idx = livros.findIndex(l => l.id === Number(id));
  if (idx === -1) throw { status: 404, message: 'Livro não encontrado' };
  livros.splice(idx, 1);
  return;
}

module.exports = { listAll, findById, createLivro, updateLivro, deleteLivro };
