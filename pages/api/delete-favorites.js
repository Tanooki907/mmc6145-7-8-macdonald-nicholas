import db from "@/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { locationId } = req.body;
  
      try {
  
        // Insert the location into the Favorite Locations table
        await db.location.deleteFav(locationId);
  
        // Send a success response
        res.status(200).json({ message: "Location removed from favorites" });
      } catch (error) {
        console.error("Error removing location from favorites:", error);
        // Send an error response
        res.status(500).json({ message: "Failed to remove location from favorites" });
      }
    } else {
      // Send a method not allowed response
      res.status(405).json({ message: "Method not allowed" });
    }
  }