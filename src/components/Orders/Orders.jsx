import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderSkeleton from "./OrderSkeleton";
import OrderCard from "./OrderCard";
import PropTypes from "prop-types";

const Orders = ({ category }) => {
    const { data: orders, isPending } = useQuery({
        queryKey: [`${category}-orders`],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:5000/menus?category=${category}`
            );
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {Array(6)
                    .fill(null)
                    .map((_, index) => (
                        <OrderSkeleton key={index} />
                    ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            {orders?.map((item) => (
                <OrderCard key={item._id} item={item} />
            ))}
        </div>
    );
};

Orders.propTypes = {
    category: PropTypes.string.isRequired,
};

export default Orders;
