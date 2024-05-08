import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Headroom from "react-headroom";

const SingleNav = ({ pageTitle, path, setIsMobileMenuOpen }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? "text-primary lg:font-bold text-lg"
                    : "text-black lg:text-white lg:font-bold text-lg"
            }
            to={path}
            onClick={() => setIsMobileMenuOpen(false)}
        >
            {pageTitle}
        </NavLink>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef();
    const navLinks = (
        <>
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Home"
                path="/"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Contact us"
                path="/contact"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Dashboard"
                path="/dashboard"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Our Menu"
                path="/menu"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Our Shop"
                path="/shop"
            />
        </>
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    return (
        <Headroom>
            <div className="bg-[#15151580] text-white z-20 w-full">
                <div className="container mx-auto px-3 md:px-6 navbar">
                    <div className="w-1/2 lg:w-[30%] justify-start">
                        <div className="dropdown" ref={dropdownRef}>
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost lg:hidden"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            {isMobileMenuOpen && (
                                <nav className="absolute top-fll flex flex-col gap-1 shadow-lg bg-white rounded-box px-5 py-3">
                                    {navLinks}
                                </nav>
                            )}
                        </div>
                        <Link
                            to="/"
                            className="flex flex-col font-cinzel text-xl"
                        >
                            <span className="font-black">BISTRO BOSS</span>{" "}
                            <span className="font-medium tracking-widest">
                                Restaurant
                            </span>
                        </Link>
                    </div>
                    <div className="w-1/2 lg:w-[70%] justify-end">
                        <nav className="hidden lg:flex gap-3 px-1">
                            {navLinks}
                        </nav>
                        <div className="flex items-center">
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle"
                                >
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">
                                            8
                                        </span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow text-black"
                                >
                                    <div className="card-body">
                                        <span className="font-bold text-lg">
                                            8 Items
                                        </span>
                                        <span className="text-info">
                                            Subtotal: $999
                                        </span>
                                        <div className="card-actions">
                                            <button className="btn btn-primary btn-block">
                                                View cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
                                >
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Settings</a>
                                    </li>
                                    <li>
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Headroom>
    );
};

SingleNav.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    setIsMobileMenuOpen: PropTypes.func.isRequired,
};

export default Header;
