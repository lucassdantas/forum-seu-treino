import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/backend/login.php', { username, password }, { withCredentials: true });
      if (response.data.success) {
        setAuth(true);
        console.log(response)
      } else {
        alert('Login failed'+JSON.stringify(response));
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
