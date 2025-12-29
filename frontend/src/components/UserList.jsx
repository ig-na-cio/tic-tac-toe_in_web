export default function UserList({ users, onDelete }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.nombre}
          <button onClick={() => onDelete(user.id)}>
            Borrar
          </button>
        </li>
      ))}
    </ul>
  );
}
