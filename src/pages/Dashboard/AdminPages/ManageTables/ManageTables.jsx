import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ThreeDots } from "react-loader-spinner";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageTables = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        data: tables = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["all-tables"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tables");
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tables/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The table has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        refetch();
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "The table remains safe",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    if (isPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Manage Tables</title>
                </Helmet>
                <SectionTitle
                    subHeading="Hurry up"
                    heading="MANAGE ALL TABLES"
                />
                <div className="min-h-[60vh] flex justify-center items-center bg-white rounded-xl my-8">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#403F3F"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </>
        );
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Manage Tables</title>
            </Helmet>
            <SectionTitle subHeading="Hurry up" heading="MANAGE ALL TABLES" />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg">
                {tables.length ? (
                    <>
                        <h3 className="font-bold text-2xl">
                            Total Tables: {tables.length}
                        </h3>
                        <div className="overflow-x-auto mt-6 rounded-xl">
                            <table className="table">
                                <thead className="bg-[#D1A054] text-white font-semibold text-base">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Table Number</th>
                                        <th>Seats</th>
                                        <th>Location</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-[#737373] text-base">
                                    {tables?.map((table, idx) => (
                                        <tr key={table._id}>
                                            <td className="text-center text-xl font-bold text-[#151515]">
                                                {idx + 1}
                                            </td>
                                            <td>{table.tableNumber}</td>
                                            <td>{table.seats}</td>
                                            <td>
                                                {table.location
                                                    ? table.location
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      table.location.slice(1)
                                                    : "-"}
                                            </td>
                                            <th className="w-32">
                                                <Link
                                                    to={`/dashboard/edit-table/${table._id}`}
                                                    className="inline-block text-white bg-[#d1a054] hover:bg-[#f3b962] p-4 rounded-md font-medium active:scale-95 transition-all"
                                                >
                                                    <FaRegEdit size={20} />
                                                </Link>
                                            </th>
                                            <th className="w-40">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(table._id)
                                                    }
                                                    className="text-white bg-[#B91C1C] hover:bg-[#d33737] p-4 rounded-md font-medium active:scale-95 transition-all"
                                                >
                                                    <FaRegTrashAlt size={20} />
                                                </button>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="text-center font-medium text-lg text-red-400">
                        Something Went Wrong
                    </p>
                )}
            </div>
        </>
    );
};

export default ManageTables;
