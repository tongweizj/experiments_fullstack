import React from 'react'

// Create the context here and initialize it with value 0
const CounterContext = React.createContext(0)

const ParentComponent = () => {

    //using useState hook at top level
    const [counter, setCounter] = React.useState(0)
    // function to update the counter using updater function setCounter
    const increment = () => setCounter(counter + 1)
    // UI
    return (

        <CounterContext.Provider value={{ counter, increment }}>
            <DisplayCounterComponent />
            <IncrementCounterComponent />
        </CounterContext.Provider>
    )
}

const DisplayCounterComponent = () => {
    // consume React context using useContext hook
    const { counter } = React.useContext(CounterContext)

    return <div>{counter}</div>
}

const IncrementCounterComponent = () => {

    // consume React context using useContext hook
    const { increment } = React.useContext(CounterContext)

    return (
        <div>
            <button onClick={() => increment()}>Increment</button>
        </div>
    )
}
export default ParentComponent;