import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Login App</h1>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <UserList token={token} />
      )}
    </div>
  );
}

export default App;
