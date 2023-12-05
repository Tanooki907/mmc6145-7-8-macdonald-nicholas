/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './[location].module.css'
import Link from 'next/link'; // Remove when possible - just testing
import TopBar from '@/components/TopBar';
import sessionOptions from '@/config/session';
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

const LocationPage = (props) => {
    const router = useRouter();
    const { location } = router.query;
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [favoriteLocations, setFavoriteLocations] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
  
    useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            const response = await fetch(`https://wttr.in/${location}?format=j1`);
            const data = await response.json();
            const coordinates = data.nearest_area[0].latitude + ',' + data.nearest_area[0].longitude;
            const [lat, lon] = coordinates.split(',');
            setLatitude(parseFloat(lat));
            setLongitude(parseFloat(lon));
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }

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
          const isLocationSaved = favoriteLocations.some((favLocation) =>
            favLocation.location === location)
          if (isLocationSaved) {
            setIsSaved(true);
          }
        };


        fetchWeatherData();
      }, [location]);

      const handleAddToFavorites = async () => {
        try {
          const response = await fetch('/api/add-to-favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              location,
              userId : props.user.id,
            }),
          });

          if (response.ok) {
            console.log('Location added to favorites');
            setIsSaved(true);
          } else {
            console.error('Failed to add location to favorites');
          }
        } catch (error) {
          console.error('Error adding location to favorites:', error);
        }
      }
  
      return (
        <div>
          <Head>
        <title>Forecast for {location} - WeatherNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar loggedIn={props.isLoggedIn} locations={favoriteLocations}/>
      <main className={styles.main}>
          <h1 className={styles.h1}>Weather Information for {location}</h1>
          {latitude && longitude ? (
            <div className={`${styles.main} ${styles.imageContainer}`}>
            <img
            src={`http://www.7timer.info/bin/civil.php?lon=${longitude}&lat=${latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}
            alt="Weather"
            />
          {props.isLoggedIn === true ? (
          <button className={`${isSaved ? styles.saved
          : styles.button}`}
          onClick={handleAddToFavorites}
          disabled={isSaved}>{isSaved ? 'Location Saved' : 'Add to Favorites'}
          </button>
          ) : (
            <p>Sign in to save this location!</p>
          )}
            </div>
          ) : (
            <p>Loading weather image...</p>
          )}
          </main>
          <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>
        </div>
      );
  };
  
  export default LocationPage;