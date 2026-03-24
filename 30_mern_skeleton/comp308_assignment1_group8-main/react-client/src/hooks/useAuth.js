import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [authname, setAuthname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role');
      const storedName = userRole === 'admin' 
        ? localStorage.getItem('username') 
        : localStorage.getItem('studentNumber');

      if (token && userRole && storedName) {
        setAuthname(storedName);
        setRole(userRole);
      } else {
        setAuthname(null);
        setRole(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('studentNumber');
    setAuthname(null);
    setRole(null);
    navigate('/auth/login');
  };

  return { authname, role, loading, logout };
}
