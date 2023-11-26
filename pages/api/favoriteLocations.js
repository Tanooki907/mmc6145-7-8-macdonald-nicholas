import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "@/config/session";

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
    console.log({ props })
    return { props };
  },
  sessionOptions
);

export default async function handler(props, res) {
  //console.log(props.isLoggedIn);
  //console.log(props.user);

  if (!props.isLoggedIn) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const userId = props.user.id;
    const ask = 'SELECT * FROM favorite_locations WHERE user_id = ?';
    const [rows] = await query(ask, [userId]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}