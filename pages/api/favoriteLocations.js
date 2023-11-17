import { query } from "@/db";

export default async function handler(req, res) {
    const { userId } = req.cookies;
  
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    try {
      const ask = 'SELECT * FROM favorite_locations WHERE user_id = ?';
      const [rows] = await query(ask, [userId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }