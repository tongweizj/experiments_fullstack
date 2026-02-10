import React from 'react';
import ThemeContext from './ThemeContext';
//
// Component consuming Context via React's useContext Hook
const SecondaryHeadline = ({ children }) => {
    
    // Accepts a context object (the value returned from
    // React.createContext) and returns the current
    // context value, as given by the nearest context provider
    // for the given context.
    const color = React.useContext(ThemeContext);
    //color is from ThemeContext, children is from the argument
    return <h2 style={{ color }}> {children}</h2>;
};
//
export default SecondaryHeadline;