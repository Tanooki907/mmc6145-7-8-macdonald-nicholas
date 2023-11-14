import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Remove when possible - just testing
import styles from './index.module.css';
import TopBar from '@/components/TopBar';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch('/api/favoriteLocations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching favorite locations:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/location/${location}`);
  };

  return (
    <div>
      <Head>
        <title>WeatherNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />

      <main className={styles.main}>
        <h1 className={styles.h1}>Welcome to WeatherNow</h1>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className={styles.button} type="submit">Search</button>
        </form>

      </main>

      <footer className={styles.footer}>
                {/* Just for testing purposes */}
                <Link href={`/location/Gainesville`} style={{color: 'blue', textDecoration: 'underline'}}>
          Testing the Link for Gainesville
        </Link>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const userId = req?.cookies.userId;

  if (userId) {
    const loggedIn = true;

    try {
      const query = 'SELECT * FROM favorite_locations WHERE user_id = ?';
      const [rows] = await query(query, [userId]);

      if (rows.length > 0) {
        const locations = rows.map((row) => row.location);
        console.log('User has favorite locations:', rows);
        return { loggedIn, locations };
      } else {
        const locations = [];
        console.log('User does not have any favorite locations');
        return { loggedIn, locations };
      }
    } catch (error) {
      console.error('Error executing MySQL query:', error);
    }
  }

  return {};
};