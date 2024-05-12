import Foods from "../../../components/Foods/Foods";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Recommends = () => {
    return (
        <section className="container mx-auto px-3 md:px-6 py-6">
            <SectionTitle subHeading="Should Try" heading="CHEF RECOMMENDS" />
            <Foods category="recommended" />
        </section>
    );
};

export default Recommends;
