import { signup } from "../../userController";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { username, password } = req.body;

  try {
    // Call the signup function from userController
    signup(username, password, async (err, userId) => {
      if (err) {
        console.error("Error registering user", err);
        res.status(500).json({ error: "Error registering user" });
        return;
      }

      // Set the userId cookie
      res.cookie("userId", userId);

      res.json({ redirectURL: "/" });
    });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ error: "Error registering user" });
  }
}