import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/Index";

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet/>
        </>
    )
}

export default Layout;