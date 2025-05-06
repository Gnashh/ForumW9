import React, { useState, useEffect } from 'react';
import './styles/Style.css';
import './styles/buttonstyle.css';
import './styles/contentstyle.css';
import Header from './components/Header';
import Name from './components/Name';
import Content from './components/Content';
import AuthPage from './components/AuthPage';
import { authService } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (localStorage.getItem('token')) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <div className="App">
        <div className="title">TO-DO LIST</div>
        <div className="user-info">
          <span>Logged in as: {user.email}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <Name userName={user.name} />
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
