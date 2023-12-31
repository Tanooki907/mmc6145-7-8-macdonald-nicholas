import { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (res.status === 200) return router.push("/");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }

    return (
        <div>

            <TopBar loggedIn={false} />

            <main className={styles.main}>

            <h1 className={styles.h1}>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
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
                {error && <p>{error}</p>}
                <button className={styles.button} type="submit">Login</button>
            </form>

            <Link href="/signup" style={{color: '#007bff', textDecoration: 'none', transition: 'color 0.3s ease'}}
            onMouseEnter={(e) => {
                e.target.style.color = '#0056b3';
            }}
            onMouseLeave={(e) => {
                e.target.style.color = '#007bff';
            }}>
                Don&apos;t have an account yet? Signup
            </Link>

            </main>

            <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>

        </div>
    );
};

export default Login;