const express = require('express');
const cors = require('cors');

const livrosRoutes = require('./routes/livros.routes');
const autoresRoutes = require('./routes/autores.routes');

const app = express();
app.use(cors());
app.use(express.json());

// rota base pra teste
app.get('/', (req, res) => res.send('API Inventário de Livros e Autores rodando 🚀'));

// rotas da API
app.use('/api/livros', livrosRoutes);
app.use('/api/autores', autoresRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
