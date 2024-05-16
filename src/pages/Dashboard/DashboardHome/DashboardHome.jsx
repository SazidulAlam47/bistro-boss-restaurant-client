import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import {
    FaCalendarDays,
    FaCartShopping,
    FaCreditCard,
    FaPhoneVolume,
    FaShop,
    FaStar,
} from "react-icons/fa6";
import { AuthContext } from "../../../providers/AuthProvider";
import defaultImg from "/images/icon/user.svg";
import { IoCard } from "react-icons/io5";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="space-y-5">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <h1 className="font-cinzel font-semibold text-3xl">
                Hi, Welcome Back!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] justify-center py-9 text-white rounded-xl">
                    <FaCreditCard size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">205</p>
                        <p className="text-2xl">Menu</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] justify-center py-9 text-white rounded-xl">
                    <FaShop size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">103</p>
                        <p className="text-2xl">Shop</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] justify-center py-9 text-white rounded-xl">
                    <FaPhoneVolume size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">03</p>
                        <p className="text-2xl">Contact</p>
                    </div>
                </div>
            </div>
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
                        <p className="text-[#0088FE] font-cinzel font-medium text-xl flex items-center gap-1">
                            <FaCartShopping /> Orders: 6
                        </p>
                        <p className="text-[#00C4A1] font-cinzel font-medium text-xl flex items-center gap-1">
                            <FaStar /> Reviews: 2
                        </p>
                        <p className="text-[#FFBB28] font-cinzel font-medium text-xl flex items-center gap-1">
                            <FaCalendarDays /> Bookings: 1
                        </p>
                        <p className="text-[#FF8042] font-cinzel font-medium text-xl flex items-center gap-1">
                            <IoCard /> Payment:3
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardHome;
