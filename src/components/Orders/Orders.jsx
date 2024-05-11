import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderSkeleton from "./OrderSkeleton";
import OrderCard from "./OrderCard";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Orders = ({ category }) => {
    const location = useLocation();
    const productsPerPage = 6;
    const [selectedPage, setSelectedPage] = useState(0);

    const { data: orders, isPending } = useQuery({
        queryKey: [`${category}-orders-${selectedPage}-${productsPerPage}`],
        queryFn: async () => {
            const menusRes = await axios.get(
                `http://localhost:5000/menus?category=${category}&page=${selectedPage}&size=${productsPerPage}`
            );
            const countRes = await axios.get(
                `http://localhost:5000/menusCount?category=${category}`
            );
            const menus = menusRes.data;
            const count = countRes.data.count;
            return { menus, count };
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

    const totalData = orders.count;
    const totalPages = Math.ceil(totalData / productsPerPage);

    const handlePageChange = (data) => {
        const currentPage = data.selected;
        setSelectedPage(currentPage);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {orders.menus?.map((item) => (
                    <OrderCard key={item._id} item={item} />
                ))}
            </div>
            {location.pathname !== "/" && (
                <div className="text-center pt-8">
                    <ReactPaginate
                        pageCount={totalPages}
                        forcePage={selectedPage}
                        nextLabel="Next >"
                        previousLabel="< Previous"
                        onPageChange={handlePageChange}
                        containerClassName="inline-flex -space-x-px text-base h-10"
                        pageLinkClassName="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        nextLinkClassName="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        previousLinkClassName="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        breakLinkClassName="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        activeLinkClassName="bg-gray-900 text-white hover:bg-gray-700 hover:text-white transition-all"
                    />
                </div>
            )}
        </>
    );
};

Orders.propTypes = {
    category: PropTypes.string.isRequired,
};

export default Orders;
