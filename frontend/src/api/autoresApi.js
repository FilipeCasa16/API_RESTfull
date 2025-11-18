const BASE = 'http://localhost:3001/api/autores';

export async function getAutores() {
  const res = await fetch(BASE);
  return res.json();
}

export async function createAutor(body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function updateAutor(id, body) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function deleteAutor(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  return res; // devolve o response para o caller checar
}