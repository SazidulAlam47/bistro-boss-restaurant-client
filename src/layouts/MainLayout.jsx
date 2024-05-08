import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="font-inter">
            <Header />
            <div className="absolute top-0 right-0 left-0">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
