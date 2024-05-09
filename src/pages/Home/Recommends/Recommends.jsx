import axios from "axios";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import RecommendCard from "./RecommendCard";
import RecommendSkeleton from "./RecommendSkeleton";

const Recommends = () => {
    const { data: recommends, isPending } = useQuery({
        queryKey: ["recommends"],
        queryFn: async () => {
            const res = await axios.get("/data/recommends.json");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <section className="container mx-auto px-3 md:px-6 py-6">
                <SectionTitle
                    subHeading="Should Try"
                    heading="CHEF RECOMMENDS"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                    {Array(3)
                        .fill(null)
                        .map((_, index) => (
                            <RecommendSkeleton key={index} />
                        ))}
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-3 md:px-6 py-6">
            <SectionTitle subHeading="Should Try" heading="CHEF RECOMMENDS" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {recommends?.map((recommend) => (
                    <RecommendCard key={recommend._id} recommend={recommend} />
                ))}
            </div>
        </section>
    );
};

export default Recommends;
