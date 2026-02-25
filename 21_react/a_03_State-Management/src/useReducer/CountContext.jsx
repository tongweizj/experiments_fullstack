// CountContext.js
import React, { createContext, useReducer } from 'react';

// Define the initial state of our application
const initialState = { count: 0 };

// Create a context for the count state
export const CountContext = createContext(initialState);

// Define a reducer function to handle state transitions based on actions
const countReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create a provider component that encapsulates the useReducer logic
export const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countReducer, initialState); 
  // countReducer 是dispatch 对应的函数

  // The value prop of the provider will hold the current state and the dispatch function
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};
