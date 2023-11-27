import db from "@/db";

export default async function handler(req, res) {
  const { isLoggedIn, user } = req.body;
  if (!isLoggedIn) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const userId = user.id;
    const ask = 'SELECT * FROM favorite_locations WHERE user_id = ?';
    const [rows] = await db.location.fetchFavorites(userId);
    console.log('fetched');
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}