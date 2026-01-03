import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getAvailableGames, joinGame } from "../api/games";

function GameMenu() {
  const [nombre, setNombre] = useState("");
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const userId = Number(sessionStorage.getItem("user_id"));

  useEffect(() => {
    getAvailableGames().then(setGames);
  }, []);

  async function handleCreate() {
    const game = await createGame(nombre, userId);
    navigate(`/lobby/${game.id}`);
  }

  return (
    <div>
      <h2>Partidas disponibles</h2>

      {games.length === 0 && <p>No hay partidas abiertas</p>}

      <ul>
        {games.map((g) => (
          <li key={g.id}>
            {g.nombre} — creador {g.creator_id}
            <button
              onClick={async () => {
                console.log("JOIN desde menu", g.id, userId);
                await joinGame(g.id, userId);
                navigate(`/lobby/${g.id}`);
              }}
            >
              Entrar
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Crear nueva partida</h3>
      <input
        placeholder="Nombre de la partida"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={ () => {
        console.log("Creating game as user:", sessionStorage.getItem("user_id"));
        handleCreate();
      }}>Crear</button>
    </div>
  );
}

export default GameMenu;
