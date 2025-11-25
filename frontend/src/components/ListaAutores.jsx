import { useEffect, useState } from "react";
import {
  getAutores,
  createAutor,
  updateAutor,
  deleteAutor,
} from "../api/autoresApi";

export default function ListaAutores({ modo }) {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEdit, setNomeEdit] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const lista = await getAutores();
    setAutores(lista);
  }

  async function salvarCriacao(e) {
    e.preventDefault();
    if (!nome) return alert("Digite um nome");
    const novo = await createAutor({ nome });
    setAutores((prev) => [...prev, novo]);
    setNome("");
  }

  async function salvarEdicao(id) {
    if (!nomeEdit) return alert("Digite um nome");
    const atualizado = await updateAutor(id, { nome: nomeEdit });
    setAutores((prev) =>
      prev.map((a) => (a.id === id ? atualizado : a))
    );
    setEditandoId(null);
  }

  async function excluir(id) {
    if (!confirm("Excluir autor?")) return;
    const res = await deleteAutor(id);
    if (!res.ok) {
      alert("Não dá pra excluir este autor porque ele tem livros cadastrados.");
      return;
    }
    setAutores((prev) => prev.filter((a) => a.id !== id));
  }

  if (modo === "criar") {
    return (
      <form onSubmit={salvarCriacao}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do autor"
        />
        <button className="btn">Criar Autor</button>
      </form>
    );
  }

  if (modo === "listar") {
    return (
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {autores.map((a) => (
          <li key={a.id} style={{ marginBottom: 16 }}>
            {editandoId === a.id ? (
              <>
                <input
                  value={nomeEdit}
                  onChange={(e) => setNomeEdit(e.target.value)}
                />
                <button className="btn" onClick={() => salvarEdicao(a.id)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {a.nome}
                <div className="btns-line">
                  <button
                    className="btn btn-small"
                    onClick={() => {
                      setEditandoId(a.id);
                      setNomeEdit(a.nome);
                    }}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => excluir(a.id)}
                  >
                    🗑 Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
