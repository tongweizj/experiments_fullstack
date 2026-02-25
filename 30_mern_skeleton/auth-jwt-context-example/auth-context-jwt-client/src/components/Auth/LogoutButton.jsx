// src/components/Auth/LogoutButton.jsx
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../../contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button variant="danger" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
