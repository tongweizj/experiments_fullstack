// File: next-context-app/src/app/dashboard/page.js

'use client'; // Required for client-side hooks
import { useMyContext } from '../../contexts/MyContext'; // Import custom context hook

// Dashboard page component
export default function DashboardPage() {
  const { state, setState } = useMyContext();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>Current Context State: {state}</p>
      <button onClick={() => setState('Updated from Dashboard!')}>
        Update State
      </button>
    </div>
  );
}
