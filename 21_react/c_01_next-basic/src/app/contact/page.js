// src/app/contact/page.js
'use client'; // client-side rendering
import { useState } from 'react';
import Welcome from './Welcome'; // Import the Welcome component

import './styles.css'; // Adjust the path if necessary

//
export default function Page() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <Welcome name={name} email={email} />;
  }

  return (
    <div>
      <h1>Contact Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

  