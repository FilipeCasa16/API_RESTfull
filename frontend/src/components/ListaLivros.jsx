import { useEffect, useState } from 'react';
import { getLivros, createLivro, updateLivro, deleteLivro } from '../api/livrosApi';
import FormLivro from './FormLivro';

export default function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getLivros();
    setLivros(data);
  }

  async function handleCreate(body) {
    const novo = await createLivro(body);
    setLivros(prev => [...prev, novo]);
  }

  async function handleUpdate(body) {
    const atualizado = await updateLivro(editing.id, body);
    setLivros(prev => prev.map(l => l.id === atualizado.id ? atualizado : l));
    setEditing(null);
  }

  async function handleDelete(id) {
    if (!confirm('Deseja excluir?')) return;
    await deleteLivro(id);
    setLivros(prev => prev.filter(l => l.id !== id));
  }

  return (
    <div>
      <h3>Livros</h3>
      <ul>
        {livros.map(l => (
          <li key={l.id}>
            {l.titulo} (autorId: {l.autorId}) — {l.ano || '-'}
            <button onClick={()=>setEditing(l)}>Editar</button>
            <button onClick={()=>handleDelete(l.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h4>{editing ? 'Editar Livro' : 'Criar Livro'}</h4>
      <FormLivro
        initial={editing || {}}
        onSubmit={editing ? handleUpdate : handleCreate}
      />
    </div>
  );
}
