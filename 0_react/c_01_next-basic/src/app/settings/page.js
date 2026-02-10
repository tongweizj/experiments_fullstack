// File: next-context-app/src/app/settings/page.js

'use client'; // Required for client-side hooks
import { useMyContext } from '../../contexts/MyContext'; // Import custom context hook

// Settings page component
export default function SettingsPage() {
  const { state } = useMyContext();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Settings</h1>
      <p>Context State: {state}</p>
    </div>
  );
}
