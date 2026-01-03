// import { useState } from "react";
// import { createUser } from "../api/users";

// export default function Login({ onLogin }) {
//   const [nombre, setNombre] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // si ya hay usuario, NO crear otro
//     const existingId = sessionStorage.getItem("user_id");
//     if (existingId) {
//       onLogin({ id: Number(existingId) });
//       return;
//     }

//     const user = await createUser(nombre);

//     // guardar SIEMPRE
//     sessionStorage.setItem("user_id", user.id);
//     onLogin(user);
//   }

//   return (
//     <div>
//       <h1>Ingresar</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={nombre}
//           onChange={(e) => setNombre(e.target.value)}
//           placeholder="Nombre de usuario"
//         />
//         <button>Entrar</button>
//       </form>
//     </div>
//   );
// }
