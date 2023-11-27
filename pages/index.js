import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import TopBar from '@/components/TopBar';
import sessionOptions from "../config/session";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Home(props) {
  const router = useRouter();
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (props.isLoggedIn) {
      const isLoggedIn = props.isLoggedIn;
      const user = props.user;

      console.log(isLoggedIn);
      console.log(user);

      fetch('/api/favoriteLocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLoggedIn, user }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming the fetched data is an array of favorite locations
          // Update the location state with the first location in the array
          if (data.length > 0) {
            setLocation(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching favorite locations:', error));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/location/${location}`);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>WeatherNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar loggedIn={props.isLoggedIn} locations={location || ''} />

      <main className={styles.main}>
        <h1 className={styles.h1}>Welcome to WeatherNow</h1>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>
    </div>
  );
}