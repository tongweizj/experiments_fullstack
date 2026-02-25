import React from "react";
import ReactDOM from "react-dom";
// updating a React element using ReactDom.render method
function Tick() {
  //create a variable element that contains HTML
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // pass it to render method
  ReactDOM.render(element, document.getElementById('root'));

}
setInterval(Tick, 1000);

export default Tick;