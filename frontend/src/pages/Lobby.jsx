import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGame, startGame, joinGame } from "../api/games";

function Lobby() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const userId = Number(sessionStorage.getItem("user_id"));

  const [game, setGame] = useState(null);

  useEffect(() => {
    // 1. fetch inicial
    getGame(gameId).then(setGame);

    // 2. websocket
    const ws = new WebSocket(`ws://localhost:8000/ws/games/${gameId}`);

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "player_joined") {
        const updated = await getGame(gameId);
        setGame(updated);
      }

      if (data.type === "game_started") {
        navigate(`/game/${gameId}`);
      }
    };

    return () => ws.close();
  }, [gameId, navigate]);


  if (!game) return <p>Cargando lobby...</p>;

  const isPlayer =
    game.player_x_id === userId || game.player_o_id === userId;

  return (
    <div>
      <h2>Lobby</h2>

      <p>Game: {game.nombre}</p>
      <p>Jugador X: {game.player_x_id}</p>
      <p>Jugador O: {game.player_o_id ?? "Esperando..."}</p>

      {!isPlayer && (
        <button
            onClick={async () => {
                await joinGame(gameId, userId);
                const updated = await getGame(gameId);
                setGame(updated);
            }}
        >
        Unirse a la partida
        </button>
      )}

      {game.creator_id === userId && game.player_o_id && (
        <button onClick={() => startGame(gameId, userId)}>
          Iniciar partida
        </button>
      )}
    </div>
  );
}

export default Lobby;
