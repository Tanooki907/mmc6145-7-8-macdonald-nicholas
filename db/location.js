import db from "./connection";

export async function addToFavorites(userId, location) {
    if (!(userId && location))
    throw new Error('Must be signed in and on a location page')
  console.log('about to query');
  await db.query(
    `INSERT INTO favorite_locations (user_id, location) VALUES (?, ?)`,
    [userId, location]
  )
  console.log('queried');
  if (!userId)
    throw new Error('User not found')
  console.log('no issues');
  return
}

export async function fetchFavorites(userId) {
    const [rows] = await db.query(
        `SELECT * FROM favorite_locations WHERE user_id = ?`,
        [userId]
    );
    return [rows];
}

export async function deleteFav(locationId) {
  await db.query(
    `DELETE FROM favorite_locations WHERE id=?`,
    [locationId]
  );
  return;
}