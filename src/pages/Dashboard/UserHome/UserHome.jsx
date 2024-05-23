import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../../../providers/AuthProvider";
import defaultImg from "/images/icon/user.svg";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: orders = [] } = useQuery({
        queryKey: ["order-count"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/email/${user.email}`);
            return res.data;
        },
    });

    return (
        <section className="space-y-12 mt-3">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <h1 className="font-cinzel font-semibold text-3xl">
                Hi, Welcome Back!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[50vh] rounded-xl overflow-hidden">
                <div className="bg-[#FFEDD5] border-b-2 lg:border-b-0 lg:border-r-2 border-[#d1a054] flex flex-col gap-4 items-center justify-center py-10">
                    <img
                        src={user.photoURL ? user.photoURL : defaultImg}
                        alt={user.displayName}
                        className="rounded-full border-2 border-[#D1A054] w-32"
                    />
                    <h3 className="text-2xl font-medium font-cinzel">
                        {user.displayName}
                    </h3>
                </div>
                <div className="bg-[#FEF9C3] flex flex-col gap-4  justify-center pl-14 py-10">
                    <h3 className="text-2xl font-medium font-cinzel">
                        Your Activities
                    </h3>
                    <div className="space-y-1">
                        <p className="text-[#0088FE] font-cinzel font-medium text-2xl flex items-center gap-1">
                            <FaCartShopping /> Orders: {orders.length}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserHome;
