import React, { useState } from 'react';

const Title = ({ onClick }) => {

    const [count, setCount] = useState(0)

    //return <button>+</button>
    return <button onClick={onClick}>+</button>
}

const Content = ({ count }) => {
    console.log({ count })

    return <>{count}</>

}

//
const App = () => {
    const [count, setCount] = useState(0)
    //
    const onClick = () => {
        console.log('clicked count:', count)
        setCount(count + 1)
    }
    console.log('rendered count:', count)

    //
    return (
        <>
            <Title onClick={onClick} />
            <Content count={count} />

        </>
    )
}



export default App;