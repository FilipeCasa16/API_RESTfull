import { useState, useEffect } from 'react';
import { getAutores } from '../api/autoresApi';

export default function FormLivro({ onSubmit, initial = {} }) {
  const [titulo, setTitulo] = useState(initial.titulo || '');
  const [autorId, setAutorId] = useState(initial.autorId || '');
  const [ano, setAno] = useState(initial.ano || '');
  const [genero, setGenero] = useState(initial.genero || '');
  const [autores, setAutores] = useState([]);

  useEffect(() => { getAutores().then(setAutores); }, []);

  useEffect(() => {
    setTitulo(initial.titulo || '');
    setAutorId(initial.autorId || '');
    setAno(initial.ano || '');
    setGenero(initial.genero || '');
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    if(!titulo || !autorId) return alert('titulo e autor são obrigatórios');
    onSubmit({ titulo, autorId, ano, genero });
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" />
      </div>
      <div>
        <select value={autorId} onChange={e=>setAutorId(e.target.value)}>
          <option value="">Escolha um autor</option>
          {autores.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
        </select>
      </div>
      <div>
        <input value={ano} onChange={e=>setAno(e.target.value)} placeholder="Ano" />
      </div>
      <div>
        <input value={genero} onChange={e=>setGenero(e.target.value)} placeholder="Gênero" />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
