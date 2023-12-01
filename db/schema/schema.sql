/* User Profiles Table */
CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username)
);

/* Favorite Locations Table */
CREATE TABLE favorite_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_profiles(id)
);