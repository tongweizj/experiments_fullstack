import React, { useReducer } from 'react';

// Reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };
    case 'DECREASE':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET':
      return { ...state, count: action.payload };
    case 'INCREMENT_BY_AMOUNT':
      return { ...state, count: state.count + action.payload };
    default:
      throw new Error('Unknown action type');
  }
};

// Counter component
const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // Event handlers
  const handleIncrease = () => dispatch({ type: 'INCREASE' });
  const handleDecrease = () => dispatch({ type: 'DECREASE' });
  const handleReset = () => dispatch({ type: 'RESET' });
  const handleSet = (value) => dispatch({ type: 'SET', payload: value });
  const handleIncrementByAmount = (amount) => dispatch({ type: 'INCREMENT_BY_AMOUNT', payload: amount });

  return (
    <div>
      <h1>Counter with useReducer</h1>
      <p>Count: {state.count}</p>
      <div>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => handleSet(10)}>Set to 10</button>
        <button onClick={() => handleIncrementByAmount(5)}>Increment by 5</button>
      </div>
    </div>
  );
};

export default Counter;
