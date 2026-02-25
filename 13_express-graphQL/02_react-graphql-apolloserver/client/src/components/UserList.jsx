import React from 'react';
import {gql, useQuery} from "@apollo/client";
//import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_USERS = gql`
{
    users{
      id
      userName
      email
      
    }
}
`;
//
const UserList = () => {

    const { loading, error, data , refetch } = useQuery(GET_USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>userName</th>
                        <th>email</th>

                </tr>
                {data.users.map((user, index) => (
                        <tr key={index}>
                            
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edituser/${user.id}`}>Edit</Link>
                            </td>

                        </tr>
                ))}
             </tbody>
            </Table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default UserList

