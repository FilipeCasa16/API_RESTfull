let autores = [
  { id: 1, nome: 'Machado de Assis' },
  { id: 2, nome: 'Clarice Lispector' },
  { id: 3, nome: 'Jorge Amado' }
];
let nextId = autores.length + 1;

function listAll() {
  return autores;
}

function createAutor(data) {
  if (!data || !data.nome) throw { status: 400, message: 'Campo nome é obrigatório' };
  const novo = { id: nextId++, nome: data.nome };
  autores.push(novo);
  return novo;
}

module.exports = { listAll, createAutor };
