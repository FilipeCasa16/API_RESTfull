import ListaLivros from './components/ListaLivros';
import ListaAutores from './components/ListaAutores';

export default function App() {
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
        {/* COLUNA LIVROS */}
        <div style={{ width: "45%", minWidth: "350px" }}>
          <h2>Criar Livro</h2>
          <ListaLivros modo="criar" />

          <h2 style={{ marginTop: 30 }}>Livros</h2>
          <ListaLivros modo="listar" />
        </div>

        {/* COLUNA AUTORES */}
        <div style={{ width: "45%", minWidth: "350px" }}>
          <h2>Criar Autor</h2>
          <ListaAutores modo="criar" />

          <h2 style={{ marginTop: 30 }}>Autores</h2>
          <ListaAutores modo="listar" />
        </div>
      </div>
    </div>
  );
}
