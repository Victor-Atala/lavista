import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://serverrecu.duckdns.org/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        alert('Error al obtener usuarios');
      }
    };
    fetchUsers();
  }, [token]);

  const deleteUser = async (username) => {
    try {
      await axios.delete(`https://serverrecu.duckdns.org/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.username !== username));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar usuario');
    }
  };

  const updateUser = async () => {
    if (!newUsername && !newPassword) {
      alert('Debe proporcionar un nuevo nombre de usuario o contraseña');
      return;
    }
    try {
      await axios.put(
        `https://serverrecu.duckdns.org/users/${editUser.username}`,
        { newUsername, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUsers = users.map((user) =>
        user.username === editUser.username
          ? { ...user, username: newUsername || user.username }
          : user
      );
      setUsers(updatedUsers);
      setEditUser(null);
      setNewUsername('');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar usuario');
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username}
            <button onClick={() => deleteUser(user.username)}>Eliminar</button>
            <button onClick={() => setEditUser(user)}>Editar</button>
          </li>
        ))}
      </ul>

      {editUser && (
        <div>
          <h3>Editar Usuario</h3>
          <label>
            Nuevo nombre de usuario:
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={updateUser}>Actualizar</button>
          <button onClick={() => setEditUser(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
