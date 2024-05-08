import Category from "./Category/Category";
import CustomerCare from "./CustomerCare";
import PopularMenu from "./PopularMenu/PopularMenu";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider />
            <Category />
            <CustomerCare />
            <PopularMenu />
        </div>
    );
};

export default Home;
