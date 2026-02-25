// CounterButtons.js
import React, { useContext } from 'react';
import { CountContext } from './CountContext';
// 1. useContext 的基本作用
// useContext 用于在函数组件中访问 React 的 Context（上下文）。
// 它让你可以跨越组件层级直接获取数据，而无需通过 props 层层传递。

const CounterButtons = () => {
  const { dispatch } = useContext(CountContext);
  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <span> | </span>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </>
  );
};

export default CounterButtons;
