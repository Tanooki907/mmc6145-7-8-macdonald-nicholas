import { useRouter } from 'next/router';
import Link from 'next/link';

const TopBar = ({ loggedIn, locations }) => {
  const router = useRouter();

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
    .catch(error => {
      // Handle fetch error
      // Display an error message or perform any other necessary actions
    });
  }

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
            {locations && Array.isArray(locations) && locations.length > 0 && (
              <div className="locations-dropdown">
                <span className="dropdown-label" style={{ marginRight: '10px' }}>Locations</span>
                <ul className="dropdown-menu">
                  {locations.map((location) => (
                    <li key={location.id}>
                      <Link href={`/location/${location.location}`}>
                        <p>{location.location}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/profile" style={{ marginRight: '10px' }}>Profile</Link>
            <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link href="/signup" style={{ marginRight: '10px' }}>Signup</Link>
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
                    gap: 10x;
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
                    display:block;
                }
            `}</style>
        </div>
    );
};

export default TopBar;