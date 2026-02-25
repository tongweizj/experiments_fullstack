// src/components/UI/Loader.jsx
import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
