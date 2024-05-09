import { Helmet } from "react-helmet-async";
import ShowMenus from "../../components/ShowMenus/ShowMenus";
import SectionCover from "../../components/SectionCover/SectionCover";

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <div className="container mx-auto px-3 md:px-6">
                <ShowMenus category="pizza" />
            </div>
            <SectionCover />
        </div>
    );
};

export default Menu;
