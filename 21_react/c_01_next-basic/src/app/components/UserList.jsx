// app/components/UserList.jsx
import React from 'react';

// Server component that receives 'users' as props
export default function UserList({ users }) {
    return (
        <div>
            <h1>User Profiles</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>Age: {user.age}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
