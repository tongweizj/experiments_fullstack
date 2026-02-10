import React from 'react';
//
// Creates a Context object with default value
const SportContext = React.createContext('some sport');
//
// Provider component to pass sports down to other components
const SportContextApp = () => {
  const [sport, setSport] = React.useState('soccer')
    return (
     <SportContext.Provider value={{sport}}>
        <SportConsumer />
      </SportContext.Provider>
    )
  }
//
// Component consuming Context via React's useContext Hook
const SportConsumer = () => {
  // Accepts a context object (the value returned from
  // React.createContext) and returns the current
  // context value, as given by the nearest context provider
  // for the given context.
  const {sport} = React.useContext(SportContext);
  //sport is from SportContext provider
  return <h2 > You like {sport}</h2>;
};
//
export default SportContextApp;