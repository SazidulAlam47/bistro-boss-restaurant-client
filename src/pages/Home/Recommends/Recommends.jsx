import Orders from "../../../components/Orders/Orders";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Recommends = () => {
    return (
        <section className="container mx-auto px-3 md:px-6 py-6">
            <SectionTitle subHeading="Should Try" heading="CHEF RECOMMENDS" />
            <Orders category="recommended" />
        </section>
    );
};

export default Recommends;
