import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import PropTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import { LiaCommentSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { MdShoppingBag } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";

const SingleNav = ({ path, children }) => {
    const closeDrawer = () => {
        const drawerCheckbox = document.getElementById("my-drawer");
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };
    return (
        <NavLink
            onClick={closeDrawer}
            className={({ isActive }) =>
                isActive
                    ? "text-[#D1A054] lg:text-white flex items-center gap-2 text-xl font-bold"
                    : "text-black flex items-center gap-2 text-xl font-medium"
            }
            to={path}
        >
            {children}
        </NavLink>
    );
};

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col gap-5 items-center ">
                <div className="bg-[#D1A054] w-full px-6 py-2 flex justify-between lg:hidden">
                    <Logo />
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-ghost drawer-button"
                    >
                        <GiHamburgerMenu />
                    </label>
                </div>

                <div className="container mx-auto px-3 md:px-6 lg:pt-6">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="p-4 w-80 min-h-full bg-base-200 lg:bg-[#D1A054] text-center pt-8 space-y-8">
                    <Logo />
                    <ul className=" pl-6 space-y-5 font-cinzel">
                        <li>
                            <SingleNav path="/dashboard/home">
                                <AiFillHome /> User Home
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/dashboard/reservation">
                                <IoCalendar /> Reservation
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/dashboard/payment">
                                <TbCreditCardPay /> Payment History
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/dashboard/cart">
                                <IoMdCart /> Cart
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/dashboard/review">
                                <LiaCommentSolid /> Add Review
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/dashboard/booking">
                                <LuCalendarCheck2 /> My Booking
                            </SingleNav>
                        </li>
                    </ul>

                    <ul className="pl-6 space-y-5 font-cinzel border-t border-black lg:border-white pt-6">
                        <li>
                            <SingleNav path="/">
                                <AiFillHome /> Home
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/menu">
                                <TiThMenu /> Menu
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/shop">
                                <MdShoppingBag /> Shop
                            </SingleNav>
                        </li>
                        <li>
                            <SingleNav path="/contact">
                                <FaEnvelope /> Contact
                            </SingleNav>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

SingleNav.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    setIsMobileMenuOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Dashboard;
