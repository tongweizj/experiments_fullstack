// AddUser component
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
//
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//
// AddUser mutation
const ADD_USER = gql`
  mutation AddUser($userName: String!, $email: String!, $password: String!) {
    createUser(userName: $userName, email: $email, password: $password) {
      userName
    }
  }
`;
// AddUser component
const AddUser = () => {
  let navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  // AddUser mutation
  const [addUser] = useMutation(ADD_USER);
  //
  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    // Add user
    addUser({ variables: { userName, email, password } });
    // Clear input fields
    setUserName('');
    setEmail('');
    setPassword('');
    setShowLoading(false);
    navigate('/userlist')  // navigate to student list page
  };
  //

  // AddUser component UI
  return (
    <div>
    {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <h2>Create User</h2>
      <Form onSubmit={saveUser}>
        <Form.Group>
            <Form.Label> User Name</Form.Label>
            <Form.Control type="text" name="userName" id="userName" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Save
        </Button>

      </Form>
    </div>

  );
};
//
export default AddUser;
