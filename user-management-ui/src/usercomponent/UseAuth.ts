import { useState } from 'react';

export const UseAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const saveToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, saveToken, logout };
};
