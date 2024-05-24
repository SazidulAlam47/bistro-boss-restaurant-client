import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <Helmet>
                <title>Bistro Boss | 404</title>
            </Helmet>
            <img src="/images/404.gif" alt="error" className="w-[30%]" />
            <h3 className="font-bold text-2xl">404 - PAGE NOT FOUND</h3>
            <p className="max-w-md text-center text-[#6A6A6A]">
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
            </p>
            <Link
                to={
                    location.pathname.includes("dashboard") ? "/dashboard" : "/"
                }
                className="btn bg-[#f5ae3d] border-0 hover:bg-[#f0a62f] text-white rounded-full px-8 shadow-lg shadow-[#f5ae3d5d] mt-2"
            >
                GO TO HOMEPAGE
            </Link>
        </div>
    );
};

export default ErrorPage;
