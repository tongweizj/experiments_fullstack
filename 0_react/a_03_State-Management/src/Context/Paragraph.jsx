// src/ComponentC.js
import React from 'react';
import ThemeContext from './ThemeContext';
//
// Component consuming Context via Consumer component
//  render something based on the context value
const Paragraph = ({ children }) => (
  <ThemeContext.Consumer>
    {color => <p style={{ color: color }}>{children}</p>}
  </ThemeContext.Consumer>
);
export default Paragraph;