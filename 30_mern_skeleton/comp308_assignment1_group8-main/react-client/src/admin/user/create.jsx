import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const ADD_USER = gql`
  mutation AddUser($firstName: String, $lastName: String, $email: String, $username: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      id
      username
    }
  }
`;

function CreateUser() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ 
    username: '',
    firstName: '', 
    lastName: '', 
    email: '',
    password: ''
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: () => {
      alert('Admin registration successful! You can now log in.');
      navigate('/auth/admin/login');
    },
    onError: (error) => {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ variables: { ...userData } });
  };

  const onChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Admin Registration</h2>
            
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username" 
                  placeholder="Enter username" 
                  value={userData.username} 
                  onChange={onChange}
                  required 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="firstName" 
                  placeholder="Enter first name" 
                  value={userData.firstName} 
                  onChange={onChange} 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="lastName" 
                  placeholder="Enter last name" 
                  value={userData.lastName} 
                  onChange={onChange} 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  placeholder="Enter email" 
                  value={userData.email} 
                  onChange={onChange} 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  placeholder="Enter password (minimum 7 characters)" 
                  value={userData.password} 
                  onChange={onChange}
                  required 
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Registering...
                    </>
                  ) : 'Register Admin'}
                </Button>
                <Button variant="link" onClick={() => navigate('/auth/admin/login')}>
                  Already have an account? Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
