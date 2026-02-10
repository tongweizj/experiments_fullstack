import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/comp308">COMP308</Link>
            </li>

          </ul>
        </nav>

        {/* <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path = "/about" element = { <About/> } > </Route>
          <Route path = "/users" element = { <Users/> } > </Route>
          <Route path = "/students" element = { <Students/> } > </Route>
          <Route path ="/comp308" element = {<COMP308/>}></Route>
          <Route path= "/" element = { <Home/> }> </Route>
        </Routes>
      </div>
    </Router>
  );
}
// write a function component per each course
function COMP308() {
  return <h2>COMP308 Emerging Technologies</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function Students() {
  return <h2>COMP308 Students</h2>;
}
//
export default App;