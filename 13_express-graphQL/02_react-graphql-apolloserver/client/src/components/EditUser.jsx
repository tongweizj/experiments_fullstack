// EditUser component
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Updated GET_USER query with `id` as `ID!`
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      userName
      email
    }
  }
`;

// Updated UPDATE_USER mutation with `id` as `ID!`
const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $userName: String!, $email: String!) {
    updateUser(id: $id, userName: $userName, email: $email) {
      id
      userName  
      email     
    }
  }
`;

function EditUser() {
  const [user, setUser] = useState({ id: '', userName: '', email: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
    onCompleted: (data) => {
      const { userName: currentUserName, email: currentEmail } = data.user;
      setUser({ id, userName: currentUserName, email: currentEmail });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser({
        variables: { id, userName: user.userName, email: user.email },
      });
      navigate('/userlist');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            placeholder="Enter user name"
            value={user.userName || ''}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={user.email || ''}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditUser;
