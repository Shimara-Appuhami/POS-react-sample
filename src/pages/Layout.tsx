import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {Toaster} from "react-hot-toast";

const NavBar=() => {
    return<>
        <NavBar/>
        <Outlet/>
        <Footer/>
        <Toaster/>
    </>
}
export default NavBar;