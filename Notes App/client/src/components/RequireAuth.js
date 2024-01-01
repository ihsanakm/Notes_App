import React, { createContext, useState } from 'react';

const authContext = createContext();


function RequireAuth({children}) {
    const [logedIn, setLogedIn] = useState(false)

    const updateLogedIn = () => {
        setLogedIn(true)
        console.log("i am called")
    }

    return (
        <authContext.Provider value={{logedIn , updateLogedIn}}>
            {children}
        </authContext.Provider>
    );
}

export {RequireAuth, authContext} ;