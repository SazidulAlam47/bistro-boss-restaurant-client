import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import PropTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import { TiThMenu } from "react-icons/ti";
import { MdFastfood, MdShoppingBag } from "react-icons/md";
import { FaEnvelope, FaList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import displayError from "../utils/displayError";
import { ImSpoonKnife } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import useAdmin from "../hooks/useAdmin";
import { PiPicnicTableBold, PiPicnicTableFill } from "react-icons/pi";

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
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isAdmin } = useAdmin();

    const handleLogOut = () => {
        navigate("/");
        logOut()
            .then(() => {
                toast.success("LogOut Successful");
            })
            .catch((err) => {
                displayError(err);
            });
    };

    return (
        <div className="drawer lg:drawer-open bg-[#f6f6f6]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center ">
                <div className="bg-[#D1A054] w-full px-6 py-2 flex justify-between lg:hidden">
                    <Logo />
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-ghost drawer-button"
                    >
                        <GiHamburgerMenu />
                    </label>
                </div>

                <div className="px-3 md:px-8 pt-4 lg:pt-7 w-full">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="p-4 w-80 min-h-screen bg-base-200 lg:bg-[#D1A054] text-center pt-8 space-y-8">
                    <Logo />
                    <ul className=" pl-6 space-y-5 font-cinzel">
                        {isAdmin ? (
                            <>
                                <li>
                                    <SingleNav path="/dashboard/admin-home">
                                        <AiFillHome /> Admin Home
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/add-items">
                                        <ImSpoonKnife /> Add Items
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/manage-items">
                                        <MdFastfood /> Manage Items
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/add-table">
                                        <PiPicnicTableBold /> Add Table
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/manage-tables">
                                        <PiPicnicTableFill /> Manage Tables
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/manage-orders">
                                        <FaList /> Manage Orders
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/users">
                                        <HiUserGroup /> All Users
                                    </SingleNav>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <SingleNav path="/dashboard/home">
                                        <AiFillHome /> User Home
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/cart">
                                        <IoMdCart /> Cart
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/payment-history">
                                        <TbCreditCardPay /> Order History
                                    </SingleNav>
                                </li>
                                <li>
                                    <SingleNav path="/dashboard/book-table">
                                        <PiPicnicTableBold /> Book a Table
                                    </SingleNav>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="pl-6 space-y-5 font-cinzel border-t border-black lg:border-white pt-6">
                        <li>
                            <Link
                                className="text-black flex items-center gap-2 text-xl font-medium"
                                to="/"
                            >
                                <AiFillHome /> Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-black flex items-center gap-2 text-xl font-medium"
                                to="/menu"
                            >
                                <TiThMenu /> Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-black flex items-center gap-2 text-xl font-medium"
                                to="/shop"
                            >
                                <MdShoppingBag /> Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-black flex items-center gap-2 text-xl font-medium"
                                to="/contact"
                            >
                                <FaEnvelope /> Contact
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogOut}
                                className="text-black flex items-center gap-2 text-xl font-medium"
                            >
                                <IoExitOutline /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

SingleNav.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Dashboard;
