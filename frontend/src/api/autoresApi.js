const BASE = 'http://localhost:3000/api/autores';

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
