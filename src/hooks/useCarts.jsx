import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCarts = () => {
    const { user } = useContext(AuthContext);
    const {
        data: carts = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        },
    });
    const totalPrice = carts
        .reduce((acc, curr) => acc + curr.foodPrice, 0)
        .toFixed(2);
    return { carts, isPending, refetch, totalPrice };
};

export default useCarts;