import React, { useReducer } from 'react';
//
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };
    case 'DECREASE':
      return { ...state, count: state.count - 1 };
    default:
      throw new Error();
  }
};
// this is the component
const Counter = () => {
  // useReducer is usually preferable to useState when you have 
  // complex state logic that involves multiple sub-values. 
  // It also lets you optimize performance for components that
  //  trigger deep updates because you can pass dispatch down 
  // instead of callbacks.
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  //
  const handleIncrease = () => {
    dispatch({ type: 'INCREASE' }); // 
  };
  //
  const handleDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };
  return (
    <div>
      <h1>Counter with useReducer</h1>
      <p>Count: {state.count}</p>
      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};
export default Counter;