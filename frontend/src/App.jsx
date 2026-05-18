import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { getToken, removeToken } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = getToken();
    if (saved) setUser(saved);
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage onSignup={setUser} />} />
          <Route path="/auth/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/auth/signup" element={<SignupPage onSignup={setUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
