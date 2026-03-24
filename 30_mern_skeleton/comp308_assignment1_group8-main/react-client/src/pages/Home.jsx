

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.css';
import schoolImg from '../image/school.webp';

function Home(props) {
    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100">
                <Col md={6} className="d-flex align-items-center justify-content-center mb-4 mb-md-0">
                    <img
                        src={schoolImg}
                        alt="School"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '350px', objectFit: 'cover' }}
                    />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                    <Card className="w-100 shadow-lg border-0">
                        <Card.Body>
                            <Card.Title as="h2" className="mb-3 text-primary">Student Enrollment System</Card.Title>
                            <Card.Subtitle className="mb-4 text-muted">Student Portal</Card.Subtitle>
                            <Card.Text as="div">
                                Welcome to your personal course management hub.<br />
                                <ul>
                                    <li>This is your personal course management hub. <br/>
                You can enroll in, modify, or drop courses with just a few clicks, and view all your enrolled courses clearly displayed on a simple, intuitive interface. <br/>
                Quickly arrange your semester schedule and effortlessly manage your academic timeline.</li>
                                </ul>
                            </Card.Text>
                            <Button variant="primary" size="lg" href="/courses">
                                View Courses
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;