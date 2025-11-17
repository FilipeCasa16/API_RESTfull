const BASE = 'http://localhost:3000/api/livros';

export async function getLivros() {
  const res = await fetch(BASE);
  return res.json();
}

export async function getLivro(id) {
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
}

export async function createLivro(body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function updateLivro(id, body) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  // returns updated resource
  if (res.status === 204) return null;
  return res.json();
}

export async function deleteLivro(id) {
  return fetch(`${BASE}/${id}`, { method: 'DELETE' });
}
