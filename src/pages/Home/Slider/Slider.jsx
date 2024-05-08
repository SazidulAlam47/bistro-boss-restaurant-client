import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";

const Slider = () => {
    const { data: slider, isPending } = useQuery({
        queryKey: ["slider"],
        queryFn: async () => {
            const res = await axios.get("/data/slider.json");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div>
                <img src="/images/slider/01.jpg" alt="slider" />
            </div>
        );
    }

    return (
        <Carousel
            showArrows={true}
            swipeable={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={4000}
        >
            {slider.map((item) => (
                <div key={item._id}>
                    <img src={item.img} alt="slider" />
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
