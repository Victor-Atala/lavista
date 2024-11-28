import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);

  // Obtener usuarios al cargar el componente
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

  // Manejar la edición de usuarios
  const handleEdit = (userId) => {
    alert(`Editar usuario con ID: ${userId}`);
    // Aquí podrías mostrar un formulario de edición
  };

  // Manejar la eliminación de usuarios
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://serverrecu.duckdns.org/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filtrar el usuario eliminado de la lista
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert('Usuario eliminado correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{' '}
            <button onClick={() => handleEdit(user.id)}>Editar</button>{' '}
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
