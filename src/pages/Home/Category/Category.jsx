import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Category.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Skeleton from "react-loading-skeleton";

const Category = () => {
    const { data: categories, isPending } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axios.get("/data/category.json");
            return res.data;
        },
    });

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <div>
                <ul className="dots"> {dots} </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 639,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    if (isPending) {
        return (
            <section className="container mx-auto px-3 md:px-6 my-12 py-6">
                <SectionTitle
                    subHeading="From 11:00am to 10:00pm"
                    heading="ORDER ONLINE"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-5 animate-pulse">
                    {Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index}>
                                <div className="sm:w-11/12 h-24 sm:h-52 lg:h-96 mx-auto">
                                    <Skeleton className="h-full" />
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-3 md:px-6 my-12 py-6">
            <SectionTitle
                subHeading="From 11:00am to 10:00pm"
                heading="ORDER ONLINE"
            />
            <div className="slider-container pt-5">
                <Slider {...settings}>
                    {categories?.map((category) => (
                        <div key={category._id} className="relative">
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-11/12 mx-auto"
                            />
                            <h3 className="font-cinzel text-3xl absolute bottom-6 left-0 right-0 text-center text-white text-shadow">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Category;
