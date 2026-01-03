const API_URL = "http://localhost:8000";

export async function createUser(nombre) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error creando usuario");
  }

  return res.json();
}
