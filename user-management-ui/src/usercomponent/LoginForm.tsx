import React, { useState } from 'react';
import type { UserRequest } from './UserRequest';
import { loginUser } from './ApiEndpoints';
import { useNavigate } from 'react-router-dom';
import type { JwtToken } from './JwtToken';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  localStorage.setItem('jwtToken', 'apiToken.token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserRequest = {
      username,
      password,
      enabled: true, // optional; depends on your backend
      role: 'USER',  // or whatever default role
    };

    try {
      const result = await loginUser(user);
      console.log('Login successful:', result.data);
      const apiToken : JwtToken = result.data;
      console.log(apiToken.token);
      localStorage.setItem('jwtToken', apiToken.token);
      // redirect, store token, etc.
      navigate('/userDetails')
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage("Login Failed");
    }
  };

  return (
          <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <p className="text-red-500 text-sm mb-3">{ErrorMessage}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
  );
};

export default LoginForm;
