import React, { useState } from 'react';

// this function component passes onClick as props
const Title = ({ onClick }) => {
  // calls onClick on the parent - hence lifting the state up
  return <button onClick={onClick}>+</button>

}


//
const App = () => {

  const [count, setCount] = useState(0)
  //
  const onClick = () => {

    console.log('clicked', count)
    // update the count
    setCount(count + 1)

  }

  console.log('rendered', count)

  return (
    <div>
      <h2> counter={count}</h2>
      <Title onClick={onClick} />
    </div>
  )

}

//
export default App;