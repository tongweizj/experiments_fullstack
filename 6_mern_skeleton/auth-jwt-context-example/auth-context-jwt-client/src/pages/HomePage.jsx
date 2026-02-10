// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import LogoutButton from '../components/Auth/LogoutButton';
import Loader from '../components/UI/Loader';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="text-center mt-5">
      <h1>React Context & JWT Authentication Example</h1>
      {user ? (
        <Row className="justify-content-md-center mt-4">
          <Col md="6">
            <h4>Welcome, {user.name}!</h4>
            <LogoutButton />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center mt-4">
          <Col md="6">
            <LoginForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
