import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//

import axios from 'axios';
import './login.css'
//
import View from './View'
//
function App() {
  //state variable for the screen
  const [screen, setScreen] = useState('auth');
  //state variables to store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "api/signin";
  // send username and password to the server
  // for initial authentication
  const authenticateUser = async (event) => {
    //event.preventDefault();
    console.log('calling auth')
    console.log(username)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { username, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen); //
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };

  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('api/read-cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ? <div className ="Login">        

            <Form >
              
              <Form.Group size = "lg" >
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" name="username" id="username" placeholder="Enter user name" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group size = "lg" >
                <Form.Label>Password:</Form.Label>
                <Form.Control  type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
          
              <Button size = "lg" variant="primary" type="Button" onClick={authenticateUser}>
                Login
              </Button>
            </Form>

        </div>        
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}
//
export default App;

