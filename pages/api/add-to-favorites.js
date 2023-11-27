import db from "@/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { location, userId } = req.body;
  
      try {
  
        // Insert the location into the Favorite Locations table
        await db.location.addToFavorites(userId, location);
  
        // Send a success response
        res.status(200).json({ message: "Location added to favorites" });
      } catch (error) {
        console.error("Error adding location to favorites:", error);
        // Send an error response
        res.status(500).json({ message: "Failed to add location to favorites" });
      }
    } else {
      // Send a method not allowed response
      res.status(405).json({ message: "Method not allowed" });
    }
  }