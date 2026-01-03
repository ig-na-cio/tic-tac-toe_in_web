import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/users";

function Home() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  // Limpia el storage al cargar la página
  useEffect(() => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("username");
  }, []);

  async function handleCreateUser() {
    if (!nombre.trim()) return;

    const user = await createUser(nombre);

    sessionStorage.setItem("user_id", user.id);
    sessionStorage.setItem("username", user.nombre);

    navigate("/menu");
}


  return (
    <div>
      <h2>Crear usuario</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={handleCreateUser}>
        Entrar
      </button>
    </div>
  );
}

export default Home;
