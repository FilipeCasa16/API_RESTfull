import { useState, useEffect } from 'react';
import { getAutores } from '../api/autoresApi';

export default function FormLivro({ onSubmit, initial = {} }) {
  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [autores, setAutores] = useState([]);


  useEffect(() => {
    getAutores().then(setAutores);
  }, []);


  useEffect(() => {
    if (initial?.id) {
      setTitulo(initial.titulo || '');
      setAutorId(initial.autor_id ?? '');
      setAno(initial.ano_publicacao || '');
      setGenero(initial.genero || '');
    }
  }, [initial]);

  function submit(e) {
    e.preventDefault();

    if (!titulo || !autorId) {
      return alert("Título e autor são obrigatórios");
    }

    const body = {
      titulo,
      autor_id: autorId,
      ano_publicacao: ano,
      genero
    };

    onSubmit(body);


    if (!initial?.id) {
      setTitulo('');
      setAutorId('');
      setAno('');
      setGenero('');
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Título"
        />
      </div>

      <div>
        <select
          value={autorId}
          onChange={e => setAutorId(e.target.value)}
        >
          <option value="">Escolha um autor</option>
          {autores.map(a =>
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          )}
        </select>
      </div>

      <div>
        <input
          value={ano}
          onChange={e => setAno(e.target.value)}
          placeholder="Ano de publicação"
        />
      </div>

      <div>
        <input
          value={genero}
          onChange={e => setGenero(e.target.value)}
          placeholder="Gênero"
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
