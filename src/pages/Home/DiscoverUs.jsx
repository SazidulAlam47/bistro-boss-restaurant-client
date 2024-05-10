import { Parallax } from "react-parallax";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const DiscoverUs = () => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage="/images/home/featured.png"
            bgImageAlt="Bistro Boss"
            strength={-200}
            className="my-6"
        >
            <div className="hero">
                <div className="hero-overlay bg-black bg-opacity-45"></div>
                <div className="hero-content flex-col gap-6 text-white py-12">
                    <SectionTitle
                        heading="Bistro Boss"
                        subHeading="Culinary Excellence Awaits"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex items-center">
                            <img
                                src="/images/home/featured.jpg"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="flex flex-col text-center sm:text-left justify-center">
                            <h1 className="text-4xl font-bold">
                                Why Choose Bistro Boss?
                            </h1>
                            <p className="py-6">
                                At Bistro Boss, we pride ourselves on offering a
                                diverse menu featuring quality ingredients and
                                exceptional service. From fresh salads to
                                indulgent desserts, each dish is crafted with
                                care, ensuring it&apos;s bursting with flavor.
                                Join us on a culinary journey and discover why
                                Bistro Boss is your go-to destination for
                                delicious, satisfying meals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default DiscoverUs;
