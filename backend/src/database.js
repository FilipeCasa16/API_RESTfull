const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '061208', 
  database: 'inventario_livros',
});

db.connect((erro) => {
  if (erro) {
    console.log('❌ Erro ao conectar ao banco:', erro);
    return;
  }
  console.log('✅ Conectado ao banco de dados!');
});

module.exports = db;
