/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './[location].module.css'
import Link from 'next/link'; // Remove when possible - just testing
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

const LocationPage = () => {
    const router = useRouter();
    const { location } = router.query;
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
  
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
        };
      
        fetchWeatherData();
      }, [location]);
  
      return (
        <div>
          <Head>
        <title>Forecast for {location} - WeatherNow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar loggedIn={props.isLoggedIn}/>

          <h1 className={styles.h1}>Weather Information for {location}</h1>
          {latitude && longitude ? (
            <img
            src={`http://www.7timer.info/bin/civil.php?lon=${longitude}&lat=${latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}
            alt="Weather"
            />
          ) : (
            <p>Loading weather image...</p>
          )}
          <footer className={styles.footer}>
                {/* Just for testing purposes */}
                <Link href={`/location/Gainesville`} style={{color: 'blue', textDecoration: 'underline'}}>
          Testing the Link for Gainesville
        </Link>
        <p>© {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
      </footer>
        </div>
      );
  };
  
  export default LocationPage;