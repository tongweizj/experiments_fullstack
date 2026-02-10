// App.js
import React from 'react';
import { CountProvider } from './CountContext';
import Counter from './Counter';
import CounterButtons from './CounterButtons';
/*
    In this simple app:

    The CountContext provides the count state to the components.
    The CountProvider uses useReducer to manage the count state.
    The Counter component displays the current count.
    The CounterButtons component provides buttons to increment and decrement the count.

*/
//
const ReducerContextPage = () => {
  return (
    <CountProvider>
      <h1>Simple Counter App with useReducer and Context</h1>
      <Counter />
      <CounterButtons />
    </CountProvider>
  );
};

export default ReducerContextPage;
