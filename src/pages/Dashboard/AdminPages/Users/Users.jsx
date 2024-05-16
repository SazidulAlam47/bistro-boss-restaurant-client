import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import capitalize from "../../../../utils/capitalize";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import defaultImg from "/images/icon/user.svg";

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

    const handleMakeAdmin = (id) => {
        axiosSecure
            .patch(`/users/admin/${id}`, { role: "admin" })
            .then((res) => {
                console.log(res.data);
                if (res.data.matchedCount > 0) {
                    refetch();
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
                                                        handleMakeAdmin(
                                                            user._id
                                                        )
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
                                                <button className="text-white bg-[#B91C1C] hover:bg-[#d33737] p-4 rounded-md font-medium active:scale-95 transition-all">
                                                    <FaRegTrashAlt size={20} />
                                                </button>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-right pr-16 py-6">
                                <button className="btn btn-ghost inline-flex gap-2">
                                    <FaRegTrashAlt size={20} /> Clear Shopping
                                    Cart
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center font-medium text-lg">
                        Your cart is empty.
                    </p>
                )}
            </div>
        </>
    );
};

export default Users;
