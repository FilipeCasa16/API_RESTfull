import { useEffect, useState } from 'react';
import { getLivros, createLivro, updateLivro, deleteLivro } from '../api/livrosApi';
import FormLivro from './FormLivro';

export default function ListaLivros({ modo }) {
  const [livros, setLivros] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (modo === "listar") load();
  }, [modo]);

  async function load() {
    const data = await getLivros();
    setLivros(data);
  }

  async function handleCreate(body) {
    await createLivro(body);
    load();
  }

  async function handleUpdate(body) {
    await updateLivro(editing.id, body);
    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Deseja excluir?')) return;
    await deleteLivro(id);
    load();
  }

  if (modo === "criar") {
    return (
      <FormLivro
        onSubmit={editing ? handleUpdate : handleCreate}
      />
    );
  }

  if (modo === "listar") {
    return (
      <ul style={{ listStyle: "disc", paddingLeft: 20 }}>
        {livros.map(l => (
          <li key={l.id} style={{ marginBottom: 12 }}>
            {l.titulo} — {l.ano_publicacao} — {l.genero}

            <div className="btns-line">
              <button className="btn btn-small" onClick={() => setEditing(l)}>
                ✏️ Editar
              </button>

              <button
                className="btn btn-small btn-danger"
                onClick={() => handleDelete(l.id)}
              >
                🗑 Excluir
              </button>
            </div>

            {editing?.id === l.id && (
              <FormLivro
                initial={editing}
                onSubmit={handleUpdate}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
