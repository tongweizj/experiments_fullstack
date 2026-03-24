// LoginForm.jsx
import React , { useState, useEffect } from 'react';
import './Login.css';
import { useAuth } from '../hooks/useAuth';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADMIN_LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const STUDENT_LOGIN_MUTATION = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        studentNumber
      }
    }
  }
`;

const LoginForm = ({ title, redirectPath, isAdmin }) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [adminLogin, { loading: adminLoading }] = useMutation(ADMIN_LOGIN_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.loginUser.token);
            localStorage.setItem('role', 'admin');
            localStorage.setItem('username', data.loginUser.user.username);
            navigate(redirectPath);
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const [studentLogin, { loading: studentLoading }] = useMutation(STUDENT_LOGIN_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.login.token);
            localStorage.setItem('role', 'student');
            localStorage.setItem('studentNumber', data.login.student.studentNumber);
            navigate(redirectPath);
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (isAdmin) {
            adminLogin({ variables: { username, password } });
        } else {
            studentLogin({ variables: { studentNumber: username, password } });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const role = localStorage.getItem('role');
            if (role === 'admin' && isAdmin) {
                navigate('/admin/dashboard');
            } else if (role === 'student' && !isAdmin) {
                navigate('/courses');
            }
        }
    }, [isAdmin, navigate]);

    const isLoading = adminLoading || studentLoading;

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <h2 className="text-center mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            {isAdmin ? 'Username' : 'Student Number'}
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username"
                            placeholder={isAdmin ? "Enter your username" : "Enter student number"} 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>

                        {!isAdmin ? (
                            <a href="/auth/admin/login" className="btn btn-outline-secondary">Admin Login</a>
                        ) : (
                            <a href="/auth/login" className="btn btn-outline-secondary">User Login</a>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
