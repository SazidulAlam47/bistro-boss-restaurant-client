import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCarts = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);
    const {
        data: carts = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !loading && Boolean(user),
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`);
            return res.data;
        },
    });
    const totalPrice = carts
        .reduce((acc, curr) => acc + curr.foodPrice, 0)
        .toFixed(2);
    return { carts, isPending, refetch, totalPrice };
};

export default useCarts;
