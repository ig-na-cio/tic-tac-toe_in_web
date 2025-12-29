import { useState } from "react";

export default function UserForm({ onCreate }) {
  const [nombre, setNombre] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre) return;

    onCreate(nombre);
    setNombre("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <button type="submit">Crear</button>
    </form>
  );
}
