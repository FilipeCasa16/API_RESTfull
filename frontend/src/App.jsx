import ListaLivros from './components/ListaLivros';
import ListaAutores from './components/ListaAutores';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Inventário de Livros e Autores</h1>
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          <ListaLivros />
        </div>
        <div style={{ width: 300 }}>
          <ListaAutores />
        </div>
      </div>
    </div>
  );
}
