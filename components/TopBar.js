import { useRouter } from 'next/router';
import Link from 'next/link';

const TopBar = ({ loggedIn, locations }) => {
  const router = useRouter();

  console.log(locations);

  return (
    <div className="top-bar">
      <div className="left-section">
        <Link href="/" className="logo">
          <span className="weather-emoji">&#127751;</span> WeatherNow
        </Link>
      </div>
      <div className="right-section">
        {loggedIn ? (
          <>
            {locations && locations.length > 0 && (
              <div className="locations-dropdown">
                <span className="dropdown-label" style={{ marginRight: '10px' }}>
                  Locations
                </span>
                <ul className="dropdown-menu">
                  {locations.map(location => (
                    <li key={location.id}>
                      <Link href={`/location/${location.location}`}>
                        <p>{location.location}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/profile" style={{ marginRight: '10px' }}>
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '10px' }}>
              Login
            </Link>
            <Link href="/signup" style={{ marginRight: '10px' }}>
              Signup
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #f2f2f2;
        }

        .logo {
          font-weight: bold;
          font-size: 18px;
          text-decoration: none;
          color: #333;
        }

        .weather-emoji {
          margin-left: 5px;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .locations-dropdown {
          position: relative;
          margin-right: 10px;
        }

        .dropdown-label {
          cursor: pointer;
          margin-right: 5px;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #fff;
          padding: 5px;
          list-style: none;
          margin: 0;
          display: none;
        }

        .locations-dropdown:hover .dropdown-menu {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default TopBar;