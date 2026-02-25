import React, { useState } from "react";


//
function FunctionalLoginControl() {
    // state hook for variable isLoggedIn
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //
    function handleLoginClick() {
        setIsLoggedIn(true);
    }

    function handleLogoutClick() {
        setIsLoggedIn(false);

    }

    let button;

    if (isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }
    //
    return (
                
        <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
        </div>
            
    );
  
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}


//
export default FunctionalLoginControl;

  
