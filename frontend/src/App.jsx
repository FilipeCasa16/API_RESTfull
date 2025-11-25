import { useEffect, useState } from "react";
import ListaLivros from './components/ListaLivros';
import ListaAutores from './components/ListaAutores';

export default function App() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);

 
  useEffect(() => {
    fetch("http://localhost:3000/livros")
      .then(res => res.json())
      .then(data => setLivros(data));
  }, []);


  useEffect(() => {
    fetch("http://localhost:3000/autores")
      .then(res => res.json())
      .then(data => setAutores(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Cadastro de Livros e Autores</h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >

        <div style={{ width: "45%", minWidth: "350px" }}>
          <h2>Criar Livro</h2>
          <ListaLivros
            modo="criar"
            livros={livros}
            setLivros={setLivros}
            autores={autores}
          />

          <h2 style={{ marginTop: 30 }}>Livros</h2>
          <ListaLivros
            modo="listar"
            livros={livros}
            setLivros={setLivros}
            autores={autores}
          />
        </div>

        <div style={{ width: "45%", minWidth: "350px" }}>
          <h2>Criar Autor</h2>
          <ListaAutores
            modo="criar"
            autores={autores}
            setAutores={setAutores}
            livros={livros}
            setLivros={setLivros}
          />

          <h2 style={{ marginTop: 30 }}>Autores</h2>
          <ListaAutores
            modo="listar"
            autores={autores}
            setAutores={setAutores}
            livros={livros}
            setLivros={setLivros}
          />
        </div>
      </div>
    </div>
  );
}
