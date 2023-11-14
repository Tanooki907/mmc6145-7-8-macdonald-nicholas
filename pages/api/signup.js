import { signup } from "../../userController";

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { username, email, password } = req.body;

    signup(username, email, password, (err, userId) => {
        if (err) {
            res.status(500).json({ error: 'Error registering user' });
            return;
        }
        const sessionId = userId;
        res.cookie('userId', sessionId)
        res.json({ message: 'User registered successfully', userId });
    });
}