    import React from 'react';
    //
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    } 
    const user = {
        firstName: 'Tom',
        lastName: 'Malone'
    }; 
    const element = (
        <h1> Hello, I am {formatName(user)}! </h1>
    ); 

    function JSXSample1Test()
    {
        return (
            <div>
              {element}
            </div>
        )
    };
    //
    //
    export default JSXSample1Test;