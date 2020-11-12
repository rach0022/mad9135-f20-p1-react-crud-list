import React from 'react'

// custom use Input hook based on this article and class lecture
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
const useFormInputState = initial => {
    // first create the value and setter function using hte useState functikon
    const [value, setValue] = React.useState(initial)

    // now lets return an object containing the value, setter function and
    // and binding function that allows us to add the callback for the onChange event
    // of the form to reset the value and also set the value as the currently
    // types value from the user
    return {
        // using JSON shorthand for value:value and setValue:setValue
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            // adding value and onChange event to the bind object to spread values out
            // in the form elements 
            value,
            onChange: event => {
                setValue(event.target.value)
            }
        }
    }
}

export default useFormInputState
