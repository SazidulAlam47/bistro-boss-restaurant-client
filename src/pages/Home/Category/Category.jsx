import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Category.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
    const { data: categories } = useQuery({
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
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <div>
                <ul className="dots"> {dots} </ul>
            </div>
        ),
    };

    return (
        <section className="container mx-auto px-3 md:px-6 my-12 py-12">
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
