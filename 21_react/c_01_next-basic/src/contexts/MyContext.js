// File: next-context-app/src/contexts/MyContext.js

"use client"; // Add this directive to mark as a Client Component

import { createContext, useContext, useState } from 'react';

// Create a context for sharing state across the app
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState('Welcome to Next.js with React Context!');

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => useContext(MyContext);
