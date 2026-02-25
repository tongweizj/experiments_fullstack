// src/components/Auth/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import AuthContext from '../../contexts/AuthContext';
import AlertMessage from '../UI/AlertMessage';

const LoginForm = () => {
  const { login, error } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Card className="p-4 shadow-sm">
      <h4 className="text-center mb-4">Login</h4>
      {error && <AlertMessage message={error} variant="danger" />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4 w-100">
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
