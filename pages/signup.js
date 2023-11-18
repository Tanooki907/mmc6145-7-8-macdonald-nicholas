import { useState } from 'react';
import Link from 'next/link';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Signup successful, redirect to dashboard
          window.location.href = '/';
        } else {
          // Signup failed, display error message
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            <Link href="/login" style={{color: 'blue', textDecoration: 'underline'}}>
                Already have an account? Login
            </Link>
        </div>
    );
};

export default Signup;