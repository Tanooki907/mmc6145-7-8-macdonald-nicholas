import { login } from '../../userController';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed'});
        return;
    }

    const { username, password } = req.body;

    login (username, password, (err, userId) => {
        if (err) {
            res.status(500).json({ error: 'Error logging in' });
            return;
        }
        if (!userId) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const sessionId = userId;
        res.cookie('userId', sessionId)
        res.json({ message: 'Login successful', userId });
    });
};