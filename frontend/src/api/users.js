const API_URL = "http://localhost:8000/users";

export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createUser(nombre) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre })
  });

  if (!res.ok) {
    throw new Error("Error creando usuario");
  }

  return res.json();
}

export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
