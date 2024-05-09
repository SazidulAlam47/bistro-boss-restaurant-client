import CallToAction from "./CTA/CallToAction";
import Category from "./Category/Category";
import CustomerCare from "./CustomerCare";
import PopularMenu from "./PopularMenu/PopularMenu";
import Recommends from "./Recommends/Recommends";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider />
            <Category />
            <CustomerCare />
            <PopularMenu />
            <CallToAction />
            <Recommends />
        </div>
    );
};

export default Home;
