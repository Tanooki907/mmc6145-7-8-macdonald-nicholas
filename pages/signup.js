import { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import styles from './index.module.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (res.status === 200) {
          console.log('finished');
          return router.push("/");
        }
        const { error: message } = await res.json();
        setError(message);
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <div>

          <TopBar loggedIn={false} />
          <main  className={styles.main}>

            <h1 className={styles.h1}>Signup</h1>
            <form className={styles.form} onSubmit={handleSignup}>
                <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.button} type="submit">Signup</button>
            </form>
            <Link href="/login" style={{color: 'blue', textDecoration: 'underline'}}>
                Already have an account? Login
            </Link>
            </main>

            <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>
        </div>
    );
};

export default Signup;