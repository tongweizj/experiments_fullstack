import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
      }
    }
  }
`;

function Login() {
  let navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('role', 'student');
      localStorage.setItem('studentNumber', data.login.student.studentNumber);
      navigate('/courses');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentNumber || !password) {
      alert("Please enter both student number and password");
      return;
    }
    login({ variables: { studentNumber, password } });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/courses');
    }
  }, [navigate]);

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Student Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Student Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter student number" 
                  value={studentNumber}
                  onChange={e => setStudentNumber(e.target.value)} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="outline-primary" as={Link} to="/auth/admin/login">
                  Admin Login
                </Button>
              </div>
            </Form>
            
            <div className="mt-3 text-center">
              <small>
                Don't have an account? <Link to="/auth/signup">Register here</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
