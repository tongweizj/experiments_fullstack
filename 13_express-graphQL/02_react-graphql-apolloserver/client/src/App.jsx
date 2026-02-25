import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
// Import components
import Home from './components/Home';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import AddArticle from './components/AddArticle';
import EditUser from './components/EditUser';
import ListArticles from './components/ListArticles';
import ArticlesHome from './components/ArticlesHome';
import UserList from './components/UserList';
// App component
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            React Client For GraphQL API
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/createuser">
                Create User
              </Nav.Link>
              <Nav.Link as={Link} to="/userlist">
                User List
              </Nav.Link>
              <Nav.Link as={Link} to="/addarticle">
                Add Article
              </Nav.Link>
              <Nav.Link as={Link} to="/listarticles">
                List Articles
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="createuser" element={<AddUser />} />
          <Route path = "edituser/:id" element={<EditUser />} />
          <Route path="addarticle" element={<AddArticle />} />
          <Route path="listarticles" element={<ListArticles />} />
          <Route path="articleshome" element={<ArticlesHome/>} />
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;
