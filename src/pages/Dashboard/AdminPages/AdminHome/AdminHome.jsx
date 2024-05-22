import { Helmet } from "react-helmet-async";
import { FaCreditCard, FaTruck, FaUsers } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: status, isPending } = useQuery({
        queryKey: ["admin-status"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-status");
            return res.data;
        },
    });

    return (
        <section className="space-y-5">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <h1 className="font-cinzel font-semibold text-3xl">
                Hi, Welcome Back!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] justify-center py-9 text-white rounded-xl">
                    <FaCreditCard size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            ${isPending ? "..." : status.revenue}
                        </p>
                        <p className="text-2xl">Revenue</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] justify-center py-9 text-white rounded-xl">
                    <FaUsers size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isPending ? "..." : status.customers}
                        </p>
                        <p className="text-2xl">Customers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] justify-center py-9 text-white rounded-xl">
                    <MdFastfood size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isPending ? "..." : status.products}
                        </p>
                        <p className="text-2xl">Products</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] justify-center py-9 text-white rounded-xl">
                    <FaTruck size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isPending ? "..." : status.orders}
                        </p>
                        <p className="text-2xl">Orders</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 bg-white rounded-lg p-5">
                <div>chart is coming</div>
            </div>
        </section>
    );
};

export default AdminHome;
