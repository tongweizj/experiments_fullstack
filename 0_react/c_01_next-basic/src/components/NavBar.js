// File: next-context-app/src/components/NavBar.js

import Link from 'next/link'; // Import Link for navigation

// Navigation bar component
export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white' }}>
      <Link href="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link href="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
      <Link href="/settings" style={{ marginRight: '10px' }}>Settings</Link>
     
      <Link href="/about" style={{ marginRight: '10px' }}>About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
