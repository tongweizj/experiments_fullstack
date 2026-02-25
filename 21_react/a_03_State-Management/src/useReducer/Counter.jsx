// Counter.js
import React, { useContext } from 'react';
import { CountContext } from './CountContext';

const Counter = () => {
  const { state } = useContext(CountContext);
  return <h2>Count: {state.count}</h2>;
};

export default Counter;
