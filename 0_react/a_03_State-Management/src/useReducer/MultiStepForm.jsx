import React, { useReducer } from 'react';
//
/*
The useReducer hook is a useful tool for managing complex state transitions
 that involve multiple values, or when the next state depends 
 on the previous state.
In this example, the `formReducer` function handles various actions, 
such as updating form values, validating inputs, and advancing/regressing 
through steps. 
The `useReducer` hook is used to manage the form state, 
and the form UI is updated based on the current `step` in the state.
*/
const initialState = {
  step: 1,
  name: '',
  email: '',
  errors: {}
};
// reducer function
function formReducer(state, action) {
    switch (action.type) {
        case 'NEXT_STEP':
            return { ...state, step: state.step + 1 };
        case 'PREV_STEP':
            return { ...state, step: state.step - 1 };
        case 'HANDLE_CHANGE':
            return { ...state, [action.name]: action.value };
        case 'VALIDATE':
            const errors = validate(state);
            return { ...state, errors };
        default:
            return state;
    }
}
//
function validate(state) {
    const errors = {};
    if (!state.email.includes('@')) {
        errors.email = 'Invalid email address';
    }
    if (!state.name) {
        errors.name = 'Name is required';
    }
    return errors;
}
//
function MultiStepForm() {
    // useReducer returns the state and a dispatch function
    const [state, dispatch] = useReducer(formReducer, initialState);
    // get the state
    const { step, name, email, errors } = state;
    // call the dispatch function to perform actions
    function handleChange(e) {
        dispatch({ type: 'HANDLE_CHANGE', name: e.target.name, value: e.target.value });
    }
    //
    function handleNext() {
        dispatch({ type: 'VALIDATE' });
        if (!Object.keys(errors).length) {
        dispatch({ type: 'NEXT_STEP' });
        }
    }
    //
    function handlePrev() {
        dispatch({ type: 'PREV_STEP' });
    }
    //
    return (
        <div>
            {step === 1 && (
            <div>
                <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                {errors.name && <p>{errors.name}</p>}
                <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                {errors.email && <p>{errors.email}</p>}
            </div>
            )}
            {step === 2 && <p>Step 2</p>}
            {step === 3 && <p>Step 3</p>}
            {step > 1 && (
            <button onClick={handlePrev}>Previous</button>
            )}
            {step < 3 && (
            <button onClick={handleNext}>Next</button>
            )}
        </div>
    );
}
//
export default MultiStepForm;