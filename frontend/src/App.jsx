import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameMenu from "./pages/GameMenu";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<GameMenu />} />
        <Route path="/lobby/:gameId" element={<Lobby />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
