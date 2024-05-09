import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import BtnWhite from "../../../components/Buttons/BtnWhite";
import ShowMenus from "../../../components/ShowMenus/ShowMenus";

const PopularMenu = () => {
    return (
        <section className="container mx-auto px-3 md:px-6 space-y-10 py-8">
            <SectionTitle subHeading="Check it out" heading="Popular Menu" />
            <ShowMenus category="popular" />
            <div className="text-center">
                <Link to="/menu">
                    <BtnWhite>View Full Menu</BtnWhite>
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;
