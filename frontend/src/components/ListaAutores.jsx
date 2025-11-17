import { useEffect, useState } from 'react';
import { getAutores, createAutor } from '../api/autoresApi';

export default function ListaAutores() {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    getAutores().then(setAutores);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nome) return alert('Informe o nome do autor');
    try {
      const novo = await createAutor({ nome });
      setAutores(prev => [...prev, novo]);
      setNome('');
    } catch (err) {
      console.error('Erro ao criar autor:', err);
      alert('Erro ao criar autor.');
    }
  };

  return (
    <div>
      <h3>Autores</h3>
      <ul>
        {autores.map(a => <li key={a.id}>{a.nome}</li>)}
      </ul>

      <form onSubmit={handleCreate}>
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome do autor"
        />
        <button type="submit">Criar Autor</button>
      </form>
    </div>
  );
}
