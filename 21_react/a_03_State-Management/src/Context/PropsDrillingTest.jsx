import React from 'react';
//
// demonstrate props drilling from parent component to grandchild component
const App = () => {
    return(
      <Parent sport = "baseball"/>
    );
  }
  
  const Parent = (props) => (
    <Child sport = {props.sport} />
  )
  
  const Child = (props) => (
    <Grandchild sport = {props.sport} />
  )
  
  const Grandchild = (props) => (
    <p>Grandchild - Sport: {props.sport}</p>
  )

  export default App;