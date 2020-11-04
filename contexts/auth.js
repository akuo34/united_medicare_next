import React, { createContext, useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Axios from 'axios';
import LoadingScreen from '../components/loadingScreen';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const api = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = document.cookie.split('=')[1];

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        try {
          const signedUser = await api.get('/api/login');
          setUser(signedUser.data.user);
          if (window.location.pathname.includes('admin') && signedUser.data.user !== 'admin') {
            Router.push('/admin/login');
          }
          if ((window.location.pathname === '/admin/login' || window.location.pathname === '/admin') && signedUser.data.user === 'admin') {
            Router.push('/admin/products');
          }
          setLoadingScreen(false);
        } catch (err) {
          if (window.location.pathname.includes('admin')) {
            Router.push('/admin/login');
          }
          setLoadingScreen(false);
        }
      } else {
        if (window.location.pathname.includes('admin')) {
          Router.push('/admin/login');
        }
        setLoadingScreen(false);
      }
    }

    loadUserFromCookies();
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const username = e.target.login.value;
    const password = e.target.password.value;

    try {
      const response = await Axios.post('/api/login', { username, password });
      const token = response.data.authToken;

      document.cookie = `auth=${token}; path=/`;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const signedUser = await api.get('/api/login');
      setUser(signedUser.data.user);

      Router.push('/admin/products');
    } catch (err) {
      alert(`Login failed: ${err.response.data}`);
    }

    document.getElementById('form-login').reset();
  };

  const logout = () => {
    const date = new Date();
    document.cookie = `auth=; expires=${date}; path=/`;
    Router.push('/admin/login');
  }

  if (loadingScreen) {
    return <LoadingScreen />
  }
  return (
    <AuthContext.Provider value={{ login, user, logout, loadingScreen }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);