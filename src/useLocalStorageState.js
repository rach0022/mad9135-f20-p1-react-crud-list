import React, { useState } from 'react'

// starter code from React Weather App lecture
// a use effect function that is altered for our usage to load
// an object from the local storage with the specified key and to 
// save that object again when set
function useLocalStorageState(key, initialValue) {
    // first get our state and setState references from useState
    // we will either get the stored item with the specified key or 
    // set up local storage item with the intial value
    const [state, setState] = useState(() => {
        const storedValue = window.localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
    })

    // we will use an useEffect hook to set the item in local storage
    // whenever the state is changed, we will need the state and key as dependacies
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])

    return [state, setState]
}

export default useLocalStorageState