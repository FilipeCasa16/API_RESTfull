const db = require('../database');

function listAll() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM autores', (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });
}

function createAutor(data) {
  return new Promise((resolve, reject) => {
    if (!data || !data.nome)
      return reject({ status: 400, message: 'Campo nome é obrigatório' });

    db.query(
      'INSERT INTO autores (nome) VALUES (?)',
      [data.nome],
      (erro, resultado) => {
        if (erro) return reject(erro);

        resolve({
          id: resultado.insertId,
          nome: data.nome
        });
      }
    );
  });
}

module.exports = { listAll, createAutor };
