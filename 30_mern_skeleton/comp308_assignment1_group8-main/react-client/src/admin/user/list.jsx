import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      firstName
      lastName
      email
    }
  }
`;

function List() {
  let navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  });

  const showDetail = (id) => {
    navigate('/admin/user/' + id);
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        Error loading admin users: {error.message}
      </Alert>
    );
  }

  const users = data?.users || [];

  return (
    <div className="container-fluid pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Admin User List</h1>
        <Button variant="primary" onClick={() => navigate('/auth/signup')}>
          <i className="bi bi-plus-circle me-1"></i> Add Admin User
        </Button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Admin User Table</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.firstName || 'N/A'}</td>
                      <td>{user.lastName || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => showDetail(user.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No admin users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>           
        </div>
      </div>
    </div>
  );
}

export default List;
