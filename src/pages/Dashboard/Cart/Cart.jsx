import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCarts from "../../../hooks/useCarts";
import { FaRegTrashAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import capitalize from "../../../utils/capitalize";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const { carts, totalPrice, isPending, refetch } = useCarts();
    const { user } = useContext(AuthContext);

    if (isPending) {
        return (
            <>
                <SectionTitle
                    subHeading="Building my perfect meal"
                    heading="My Cart"
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

    const handleDeleteOne = (id) => {
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
                axiosSecure.delete(`/carts/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Removed!",
                            text: "The Item has been removed from your cart.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        //remove from UI
                        refetch();
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "The Item remains safe",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    const handleDeleteAll = () => {
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
                axiosSecure.delete(`/carts/email/${user.email}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Removed!",
                            text: "The everything has been removed from your cart.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        //remove from UI
                        refetch();
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "The everything remains safe",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Cart</title>
            </Helmet>
            <SectionTitle
                subHeading="Building my perfect meal"
                heading="My Cart"
            />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg">
                {carts.length ? (
                    <>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-2xl">
                                Total Orders: {carts.length}
                            </span>
                            <span className="font-bold text-2xl">
                                Total Price: ${totalPrice}
                            </span>
                            <Link
                                to="/dashboard/payment"
                                className="inline-block text-white bg-[#D1A054] hover:bg-[#e9af59] px-5 py-2 rounded-md font-medium active:scale-95 transition-all"
                            >
                                Pay
                            </Link>
                        </div>
                        <div className="overflow-x-auto mt-6 rounded-xl">
                            <table className="table">
                                <thead className="bg-[#D1A054] text-white font-semibold text-base">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>ITEM IMAGE</th>
                                        <th>ITEM NAME</th>
                                        <th>CATEGORY</th>
                                        <th>PRICE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-[#737373] text-base">
                                    {carts?.map((cart, idx) => (
                                        <tr key={cart._id}>
                                            <td className="text-center text-xl font-bold text-[#151515]">
                                                {idx + 1}
                                            </td>
                                            <td>
                                                <img
                                                    src={cart.foodImage}
                                                    alt={cart.foodName}
                                                    className="w-24 rounded-md"
                                                />
                                            </td>
                                            <td>{cart.foodName}</td>
                                            <td>
                                                {capitalize(cart.foodCategory)}
                                            </td>
                                            <td>${cart.foodPrice}</td>
                                            <th className="w-36">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOne(
                                                            cart._id
                                                        )
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
                            <div className="text-right pr-16 py-6">
                                <button
                                    onClick={handleDeleteAll}
                                    className="btn btn-ghost inline-flex gap-2"
                                >
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

export default Cart;
