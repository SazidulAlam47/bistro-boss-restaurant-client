import { Helmet } from "react-helmet-async";
import ShowMenus from "../../components/ShowMenus/ShowMenus";

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <div className="container mx-auto px-3 md:px-6">
                <ShowMenus key="data" url="http://localhost:5000/menus" />
            </div>
        </div>
    );
};

export default Menu;
