const db = require('db');
const bcrypt = require('bcrypt');

//User registration/signup
exports.signup = (username, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            callback(err);
            return;
        }

        const sql = 'INSERT INTO user_profiles (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                callback(err);
                return;
            }
            callback(null, result.insertId);
        });
    });
};

// User Login
exports.login = (username, password, callback) => {
    const sql = 'SELECT id, password FROM user_profiles WHERE username = ?';
    db.query(sq, [username], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            callback(err);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // Invalid username
            return;
        }

        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                callback(err);
                return;
            }
            if (!isMatch) {
                callback(null, null) // Invalid password
                return;
            }
            callback(null, result[0].id)
        })
    })
}