import { useEffect, useState, useMemo } from 'react';
import { getLivros, createLivro, updateLivro, deleteLivro } from '../api/livrosApi';
import FormLivro from './FormLivro';

function norm(text = "") {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function ListaLivros({ modo, livros = [], setLivros, autores = [], setAutores }) {
  const [editing, setEditing] = useState(null);
  const [busca, setBusca] = useState("");
  const [autoresLocal, setAutoresLocal] = useState(autores || []);


  useEffect(() => {
    if (autores && autores.length) {
      setAutoresLocal(autores);
    }
  }, [autores]);


  useEffect(() => {
    async function fetchAutores() {
      try {

        if (autoresLocal && autoresLocal.length) return;

        const res = await fetch('http://localhost:3000/autores');
        const data = await res.json();

        setAutoresLocal(data);
        if (setAutores) setAutores(data); 
      } catch (err) {
        console.error('Erro ao buscar autores:', err);
      }
    }

    fetchAutores();
  }, [autoresLocal, setAutores]);

  useEffect(() => {

    async function load() {
      try {
        const data = await getLivros();
        if (setLivros) setLivros(data);
      } catch (err) {
        console.error('Erro ao carregar livros:', err);
      }
    }

    if (!livros || livros.length === 0) load();
   
  }, []);

  async function handleCreate(body) {
    await createLivro(body);
    const data = await getLivros();
    if (setLivros) setLivros(data);
  }

  async function handleUpdate(body) {
    await updateLivro(editing.id, body);
    setEditing(null);
    const data = await getLivros();
    if (setLivros) setLivros(data);
  }

  async function handleDelete(id) {
    if (!confirm('Deseja excluir?')) return;
    await deleteLivro(id);
    const data = await getLivros();
    if (setLivros) setLivros(data);
  }


  const autorNameById = useMemo(() => {
    const map = new Map();
    (autoresLocal || []).forEach(a => {
      map.set(String(a.id), norm(a.nome || ''));
    });
    return map;
  }, [autoresLocal]);

 
  const livrosFiltrados = (livros || []).filter(livro => {
    const termo = norm(busca);
    if (!termo) return true;

    const tituloNorm = norm(livro.titulo || '');
    const autorNomeNorm = autorNameById.get(String(livro.autor_id)) || '';

    return tituloNorm.includes(termo) || autorNomeNorm.includes(termo);
  });


  return (
    <div>
      {modo === "listar" && (
        <input
          type="text"
          placeholder="Pesquisar por título"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search"
        />
      )}

      {modo === "criar" && (
        <FormLivro
          onSubmit={editing ? handleUpdate : handleCreate}
          initial={editing || {}}
          autores={autoresLocal}
        />
      )}

      {modo === "listar" && (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {livrosFiltrados.map((l) => {
            const nomeAutor =
              autoresLocal.find((a) => String(a.id) === String(l.autor_id))
                ?.nome || "";
            return (
              <li key={l.id} style={{ marginBottom: 12 }}>
                <strong>{l.titulo}</strong> — {l.ano_publicacao} — {l.genero} —{" "}
                {nomeAutor}
                <div className="btns-line">
                  <button
                    className="btn btn-small"
                    onClick={() => setEditing(l)}
                  >
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
                    autores={autoresLocal}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
