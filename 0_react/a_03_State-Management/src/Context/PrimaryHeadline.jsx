import React from 'react';
import ThemeContext from './ThemeContext';
//
// Component consuming Context via Consumer component
//  render something based on the context value

const PrimaryHeadline = ({ children }) => (
  // The value argument passed to the function will be equal to
  // the value prop of the closest Provider for this context 
  // above in the tree. If there is no Provider for this context
  // above, the value argument will be equal to the defaultValue
  // that was passed to createContext().
  <ThemeContext.Consumer>
    {value => <h1 style={{ color: value }}>{ children }</h1>}
  </ThemeContext.Consumer>
);
export default PrimaryHeadline;
