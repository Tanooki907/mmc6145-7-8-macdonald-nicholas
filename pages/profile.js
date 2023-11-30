import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import db from '@/db';
import TopBar from '@/components/TopBar';
import Head from 'next/head';

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

export default function Profile(props) {
    const router = useRouter();
    const [favoriteLocations, setFavoriteLocations] = useState([]);

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
            setFavoriteLocations(data);
          })
          .catch((error) => console.error('Error fetching favorite locations:', error));
      }
    }, []);

    async function handleDelete(locationId) {
        await db.location.deleteFav(locationId);
        console.log('deleted');
        router.push('/profile');
    };

    function handleLogout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin'
          })
          .then(response => {
            if (response.ok) {
              // Redirect the user to the login page or any other desired page
              router.push('/');
            } else {
              // Handle error response
              // Display an error message or perform any other necessary actions
            }
          })
    }

    return(
      <div>
        <Head>
          <title>{user.username}'s Settings</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <TopBar loggedIn={true} locations={favoriteLocations} />
        <main className={styles.main}>
          <h1>{user.username}'s Settings</h1>
          <h2>Your Favorite Locations:</h2>
          <ul className={styles.button}>
            {favoriteLocations.map((location) => (
              <li key={location.id}>
                {location.name}
                <button
                className={styles.button}
                onClick={() => handleDelete(location.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.button}
          onClick={handleLogout}>
            Logout
          </button>
        </main>
      </div>
    )
};