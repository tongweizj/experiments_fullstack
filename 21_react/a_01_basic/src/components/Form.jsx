import React from 'react';
import ReactDOM from 'react-dom';

  
//
function Form() {
    function handleSubmit(e) {
      // to prevent browser refresh
      e.preventDefault();
      // show something
      alert('Submit')
    }
    //
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }
  //
  export default Form;