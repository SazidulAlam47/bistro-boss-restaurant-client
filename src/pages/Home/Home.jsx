import CallToAction from "./CTA/CallToAction";
import Category from "./Category/Category";
import CustomerCare from "./CustomerCare";
import DiscoverUs from "./DiscoverUs";
import PopularMenu from "./PopularMenu/PopularMenu";
import Recommends from "./Recommends/Recommends";
import Slider from "./Slider/Slider";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Slider />
            <Category />
            <CustomerCare />
            <PopularMenu />
            <CallToAction />
            <Recommends />
            <DiscoverUs />
            <Testimonials />
        </div>
    );
};

export default Home;
