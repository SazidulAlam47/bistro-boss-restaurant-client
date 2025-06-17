import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import capitalize from "../../../../utils/capitalize";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import defaultImg from "/images/icon/user.svg";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Users</title>
                </Helmet>
                <SectionTitle
                    subHeading="How many??"
                    heading="MANAGE ALL USERS"
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

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Make this user an admin?",
            text: `Make ${user.email} an admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/admin/${user._id}`, { role: "admin" })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.matchedCount > 0) {
                            refetch();
                        }
                    });
            }
        });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete user ${user.email}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Users</title>
            </Helmet>
            <SectionTitle subHeading="How many??" heading="MANAGE ALL USERS" />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg">
                {users.length ? (
                    <>
                        <h3 className="font-bold text-2xl">
                            Total Users: {users.length}
                        </h3>
                        <div className="overflow-x-auto mt-6 rounded-xl">
                            <table className="table">
                                <thead className="bg-[#D1A054] text-white font-semibold text-base">
                                    <tr>
                                        <th className="text-center">#</th>

                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Current Role</th>
                                        <th>Change Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-[#737373] text-base">
                                    {users?.map((user, idx) => (
                                        <tr key={user._id}>
                                            <td className="text-center text-xl font-bold text-[#151515]">
                                                {idx + 1}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div
                                                            className={`mask mask-squircle w-12 h-12 bg-[#f6f6f6] ${
                                                                user.image ||
                                                                "rounded-full"
                                                            }`}
                                                        >
                                                            <img
                                                                src={
                                                                    user.image
                                                                        ? user.image
                                                                        : defaultImg
                                                                }
                                                                alt={user.name}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="font-bold">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>

                                            <td>
                                                {user.role
                                                    ? capitalize(user.role)
                                                    : "Customer"}
                                            </td>
                                            <th className="w-36">
                                                <button
                                                    onClick={() =>
                                                        handleMakeAdmin(user)
                                                    }
                                                    className="btn text-white bg-[#d1a054] hover:bg-[#f3b962]"
                                                    disabled={
                                                        user.role === "admin"
                                                    }
                                                >
                                                    Make Admin
                                                </button>
                                            </th>
                                            <th className="w-36">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user)
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

export default Users;
