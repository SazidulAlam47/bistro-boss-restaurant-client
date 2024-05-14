import { Helmet } from "react-helmet-async";
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
        <>
            <Helmet>
                <title>Bistro Boss</title>
            </Helmet>
            <Slider />
            <Category />
            <CustomerCare />
            <PopularMenu />
            <CallToAction />
            <Recommends />
            <DiscoverUs />
            <Testimonials />
        </>
    );
};

export default Home;
