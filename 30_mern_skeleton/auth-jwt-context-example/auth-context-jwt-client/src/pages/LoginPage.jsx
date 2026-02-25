// src/pages/LoginPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
