'use client'; // Required for client-side hooks
import Image from "next/image";
import UserList from './components/UserList';
import { useMyContext } from '../contexts/MyContext'; // Import custom context hook

export default function Home() {
  const { state, setState } = useMyContext();

  // Mock data for user profiles
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  ];
  return (
    <div style={{ padding: '20px', textAlign: 'center' }} className="">
      <h1>Welcome to User Profiles</h1>
      <UserList users={users} />

      <h2>state: {state}</h2>
      <button onClick={() => setState('Hello from the Home Page!')}>
        Update Message
      </button>
    </div>
  );
}
