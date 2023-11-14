import TopBar from "./TopBar";

const Layout = ({ children, loggedIn, locations }) => {
    return (
        <div>
            <TopBar loggedIn={loggedIn} locations={locations} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;