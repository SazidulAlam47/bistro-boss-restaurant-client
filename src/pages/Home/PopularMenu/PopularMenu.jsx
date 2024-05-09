import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import axios from "axios";
import PopularItem from "./PopularItem";
import { Link } from "react-router-dom";
import PopularItemSkeleton from "./PopularItemSkeleton";
import Skeleton from "react-loading-skeleton";

const PopularMenu = () => {
    const { data: popularMenu, isPending } = useQuery({
        queryKey: ["popular-menu"],
        queryFn: async () => {
            const res = await axios.get("/data/menu.json");
            const fullMenu = res.data;
            const popularMenu = fullMenu.filter(
                (item) => item.category === "popular"
            );
            return popularMenu;
        },
    });

    if (isPending) {
        return (
            <div className="container mx-auto px-3 md:px-6 space-y-10 py-8">
                <SectionTitle
                    subHeading="Check it out"
                    heading="Popular Menu"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <PopularItemSkeleton key={index} />
                        ))}
                </div>
                <div className="text-center">
                    <Skeleton height={40} width={130} />
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-3 md:px-6 space-y-10 py-8">
            <SectionTitle subHeading="Check it out" heading="Popular Menu" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {popularMenu?.map((popularItem) => (
                    <PopularItem
                        key={popularItem._id}
                        popularItem={popularItem}
                    />
                ))}
            </div>
            <div className="text-center">
                <Link
                    to="/menu"
                    className="btn btn-ghost border-0 border-b-2 border-[#1F2937] hover:border-[#1F2937] hover:bg-[#00000010]"
                    style={{ boxShadow: "0px 0px 20px #00000024" }}
                >
                    View Full Menu
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;
