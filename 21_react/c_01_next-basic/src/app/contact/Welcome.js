// src/app/contact/Welcome.js
const Welcome = ({ name, email }) => {
    return (
      <div>
        <h1>Welcome, {name}!</h1>
        <p>Thank you for submitting your contact information.</p>
        <p>We will reach out to you at {email}.</p>
      </div>
    );
  };
  
  export default Welcome;
  