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
    if (modo === "listar") carregar();
  }, [modo]);

  async function carregar() {
    const lista = await getAutores();
    setAutores(lista);
  }

  async function salvarCriacao(e) {
    e.preventDefault();
    if (!nome) return alert("Digite um nome");
    await createAutor({ nome });
    setNome("");
    carregar();
  }

  async function salvarEdicao(id) {
    if (!nomeEdit) return alert("Digite um nome");
    await updateAutor(id, { nome: nomeEdit });
    setEditandoId(null);
    carregar();
  }

  async function excluir(id) {
    if (!confirm("Excluir autor?")) return;
    await deleteAutor(id);
    carregar();
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
