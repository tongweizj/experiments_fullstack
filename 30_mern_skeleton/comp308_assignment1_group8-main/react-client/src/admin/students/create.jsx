import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const ADD_STUDENT = gql`
  mutation AddStudent(
    $studentNumber: String!,
    $password: String!,
    $firstName: String,
    $lastName: String,
    $address: String,
    $city: String,
    $phoneNumber: String,
    $email: String,
    $program: String,
    $favoriteTopic: String,
    $hobby: String
  ) {
    addStudent(
      studentNumber: $studentNumber,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      city: $city,
      phoneNumber: $phoneNumber,
      email: $email,
      program: $program,
      favoriteTopic: $favoriteTopic,
      hobby: $hobby
    ) {
      id
      studentNumber
    }
  }
`;

function CreateStudent() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: '',
    favoriteTopic: '',
    hobby: ''
  });

  const [addStudent, { loading, error }] = useMutation(ADD_STUDENT, {
    onCompleted: (data) => {
      navigate('/admin/students');
    }
  });

  const saveUser = (e) => {
    e.preventDefault();
    addStudent({ variables: { ...user } });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create New Student</h2>
      
      {error && <Alert variant="danger">{error.message}</Alert>}
      
      {loading && (
        <div className="text-center mb-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Form onSubmit={saveUser} className="card p-4 shadow-sm">
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Student Number *</Form.Label>
              <Form.Control 
                type="text" 
                name="studentNumber" 
                required 
                placeholder="Enter Student Number" 
                value={user.studentNumber} 
                onChange={onChange} 
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                required 
                placeholder="Enter password" 
                value={user.password} 
                onChange={onChange} 
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={user.email} onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" placeholder="Enter address" value={user.address} onChange={onChange} />
        </Form.Group>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="Enter city" value={user.city} onChange={onChange} />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" placeholder="Enter phone number" value={user.phoneNumber} onChange={onChange} />
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Program</Form.Label>
          <Form.Control type="text" name="program" placeholder="Enter program" value={user.program} onChange={onChange} />
        </Form.Group>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Favorite Topic</Form.Label>
              <Form.Control type="text" name="favoriteTopic" placeholder="Enter favorite topic" value={user.favoriteTopic} onChange={onChange} />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Hobby</Form.Label>
              <Form.Control type="text" name="hobby" placeholder="Enter hobby" value={user.hobby} onChange={onChange} />
            </Form.Group>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create Student'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/admin/students')}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateStudent;
