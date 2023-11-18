import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default async function handler(req, res) {
    const { userId } = req.cookies;
    console.log(props.user);
  
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
    console.log(rows);
  }