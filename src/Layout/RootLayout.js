import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer"
const RootLayout = ({ isLoggedIn, setIsLoggedIn }) => {
    return (

        <div className="root-layout">
            <header>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </header>

            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>

    );
}

export default RootLayout;
