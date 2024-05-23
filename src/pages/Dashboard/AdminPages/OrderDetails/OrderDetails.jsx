import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import capitalize from "../../../../utils/capitalize";
import moment from "moment";
import useAdmin from "../../../../hooks/useAdmin";

const OrderDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { isAdmin } = useAdmin();

    const {
        data: order,
        isPending: isOrderPending,
        refetch,
    } = useQuery({
        queryKey: ["manage-orders", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${id}`);
            return res.data;
        },
    });

    const { data: items, isPending: isItemsPending } = useQuery({
        queryKey: ["order-items", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order-items/${id}`);
            return res.data;
        },
    });

    console.log(order, items);

    if (isOrderPending || isItemsPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Orders Details</title>
                </Helmet>
                <SectionTitle
                    subHeading="What is in the order list?"
                    heading="Orders Details"
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

    const handleDelivered = () => {
        axiosSecure
            .patch(`/orders/status/${id}`, { status: "delivered" })
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
                <title>Bistro Boss | Orders Details</title>
            </Helmet>
            <SectionTitle
                subHeading="What is in the order list?"
                heading="Orders Details"
            />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg">
                {items.length ? (
                    <>
                        <div className="">
                            <p className="text-2xl">
                                <span className="font-bold">Order ID : </span>
                                {order._id}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">Name : </span>
                                {order.name}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">Email : </span>
                                {order.email}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">
                                    Total Price :{" "}
                                </span>
                                ${order.price}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">
                                    Transaction ID :{" "}
                                </span>{" "}
                                {order.tnxId}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">Status : </span>
                                {capitalize(order.status)}
                            </p>
                            <p className="text-2xl">
                                <span className="font-bold">Order Date : </span>
                                {moment(order.date).format(
                                    "D MMMM  YYYY, h:mm:ss a"
                                )}
                            </p>
                            {isAdmin && (
                                <button
                                    onClick={handleDelivered}
                                    disabled={order.status === "delivered"}
                                    className="btn bg-[#d1a054] text-xl text-white hover:bg-[#eeb560] mt-3"
                                >
                                    Order Delivered
                                </button>
                            )}
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
                                    </tr>
                                </thead>
                                <tbody className=" text-[#737373] text-base">
                                    {items?.map((cart, idx) => (
                                        <tr key={cart._id}>
                                            <td className="text-center text-xl font-bold text-[#151515]">
                                                {idx + 1}
                                            </td>
                                            <td>
                                                <img
                                                    src={cart.image}
                                                    alt={cart.name}
                                                    className="w-24 rounded-md"
                                                />
                                            </td>
                                            <td>{cart.name}</td>
                                            <td>{capitalize(cart.category)}</td>
                                            <td>${cart.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="text-center font-medium text-lg">
                        No one has ordered anything
                    </p>
                )}
            </div>
        </>
    );
};

export default OrderDetails;
