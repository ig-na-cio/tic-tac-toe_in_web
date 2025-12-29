import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/users";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleCreate(nombre) {
    await createUser(nombre);
    loadUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);
    loadUsers();
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <UserForm onCreate={handleCreate} />
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
}
