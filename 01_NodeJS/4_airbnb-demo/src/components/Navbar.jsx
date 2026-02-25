import React from "react";
import { ReactDOM } from "react";
import airbnbLogo from '../images/airbnb.png'
export default function Navbar(){
  return (
    <header>
      <nav>
      <img src={airbnbLogo} className="airbnblogo" alt="airbnb logo" />
      </nav>
    </header>
  )
}