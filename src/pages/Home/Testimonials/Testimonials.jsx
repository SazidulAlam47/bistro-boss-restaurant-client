import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import axios from "axios";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";

const SampleNextArrow = ({ onClick }) => {
    return (
        <button
            className="text-[#007AFF] z-20 absolute -right-12 top-1/2"
            onClick={onClick}
        >
            <IoIosArrowForward size={30} />
        </button>
    );
};

const SamplePrevArrow = ({ onClick }) => {
    return (
        <button
            className="text-[#007AFF] z-20 absolute -left-12 top-1/2"
            onClick={onClick}
        >
            <IoIosArrowBack size={30} />
        </button>
    );
};

const Testimonials = () => {
    const { data: reviewers, isPending } = useQuery({
        queryKey: ["reviewers"],
        queryFn: async () => {
            const res = await axios.get("/data/reviews.json");
            return res.data;
        },
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const StarDrawing = (
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    );

    const customStyles = {
        itemShapes: StarDrawing,
        activeFillColor: "#cd9003",
        inactiveFillColor: "#a1a1a1",
    };

    if (isPending) {
        return (
            <section className="container mx-auto px-3 md:px-6 py-24">
                <SectionTitle
                    heading="Testimonials"
                    subHeading="What Our Clients Say"
                />
                <div className="slider-container pt-3">
                    <div className="text-center space-y-8">
                        <div className="animate-pulse space-y-8 opacity-60">
                            <Rating
                                className="max-w-48 mx-auto"
                                value={5}
                                itemStyles={customStyles}
                                readOnly
                            />
                            <FaQuoteLeft className="mx-auto" size={100} />
                        </div>
                        <div className="space-y-3">
                            <Skeleton count={2} />
                            <Skeleton width={320} />
                            <Skeleton width={250} height={25} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-3 md:px-6 py-24">
            <SectionTitle
                heading="Testimonials"
                subHeading="What Our Clients Say"
            />
            <div className="slider-container pt-3">
                <Slider {...settings}>
                    {reviewers?.map((reviewer) => (
                        <div
                            key={reviewer._id}
                            className="text-center space-y-8"
                        >
                            <Rating
                                className="max-w-48 mx-auto"
                                value={reviewer.rating}
                                itemStyles={customStyles}
                                readOnly
                            />
                            <FaQuoteLeft className="mx-auto" size={100} />
                            <div className="space-y-3">
                                <p className="text-xl">{reviewer.details}</p>
                                <h3 className="font-medium text-3xl text-[#CD9003]">
                                    {reviewer.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

SampleNextArrow.propTypes = {
    onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
    onClick: PropTypes.func,
};

export default Testimonials;
