import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { Link } from "react-router-dom";
import capitalize from "../../../../utils/capitalize";

const ManageOrders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders, isPending } = useQuery({
        queryKey: ["manage-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        },
    });

    if (isPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Manage Orders</title>
                </Helmet>
                <SectionTitle
                    subHeading="Deliver it now"
                    heading="Manage Orders"
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
                <title>Bistro Boss | Manage Orders</title>
            </Helmet>
            <SectionTitle subHeading="Deliver it now" heading="Manage Orders" />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg space-y-6">
                <p className="font-bold text-2xl">
                    Total Orders: {orders.length}
                </p>

                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        <thead className="bg-[#D1A054] text-white font-semibold text-base">
                            <tr className="uppercase">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>TOTAL PRICE</th>
                                <th>Status</th>
                                <th>PAYMENT DATE</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[#737373] text-base">
                            {orders.map((payment, idx) => (
                                <tr key={payment._id}>
                                    <td>{idx + 1}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.email}</td>
                                    <td>${payment.price}</td>
                                    <td>{capitalize(payment.status)}</td>
                                    <td>
                                        {moment(payment.date).format(
                                            "D MMMM  YYYY, h:mm:ss a"
                                        )}
                                    </td>

                                    <td>
                                        <Link
                                            to={`/dashboard/order-details/${payment._id}`}
                                            className="btn btn-sm bg-[#d1a054] text-white hover:bg-[#eeb560]"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageOrders;
