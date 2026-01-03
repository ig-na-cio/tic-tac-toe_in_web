import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGame } from "../api/games";

function Game() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGame(gameId).then(setGame).catch(console.error);
  }, [gameId]);

  if (!game) return <p>Cargando juego...</p>;

  return (
    <div>
      <h2>🎮 Game</h2>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}

export default Game;
