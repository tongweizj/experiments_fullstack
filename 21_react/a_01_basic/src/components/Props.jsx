import React from "react";
import ReactDOM from "react-dom";

// lay 2
// 使用上一次传递过来的props
function StrMaker(props) {
  return (
    <h2>
      Hello! I'm {props.name}, a {props.age} years old {props.occupation}.
      Just testing how props work!
    </h2>
  );
}
// lay 1
function Greeting() {
  const name = 'john doe';
  const age = 23;
  const occupation = 'software engineer';
  return (
    <div>
      <StrMaker name={name} age={age} occupation={occupation} />
    </div>
  );
}
export default Greeting;
