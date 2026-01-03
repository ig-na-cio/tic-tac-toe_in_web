const API_URL = "http://localhost:8000";

export async function getGame(gameId) {
  const res = await fetch(`${API_URL}/games/${gameId}`);
  if (!res.ok) throw new Error("Error obteniendo game");
  return res.json();
}

export async function startGame(gameId, userId) {
  const res = await fetch(
    `${API_URL}/games/${gameId}/start?user_id=${userId}`,
    {
      method: "PUT",
    }
  );

  if (!res.ok) throw new Error("Error iniciando game");
  return res.json();
}

export async function createGame(nombre, creatorId) {
  const res = await fetch("http://localhost:8000/games/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      creator_id: creatorId,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error creando game");
  }

  return res.json();
}

export async function joinGame(gameId, userId) {
  const res = await fetch(
    `http://localhost:8000/games/${gameId}/join?user_id=${userId}`,
    { method: "PUT" }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error al unirse");
  }

  return res.json();
}

export async function getAvailableGames() {
  const res = await fetch("http://localhost:8000/games/available");
  return res.json();
}