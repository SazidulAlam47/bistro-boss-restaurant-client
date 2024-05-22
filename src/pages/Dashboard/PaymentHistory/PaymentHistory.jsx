import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment/moment";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: payments, isPending } = useQuery({
        queryKey: ["payment-history"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    if (isPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Payment History</title>
                </Helmet>
                <SectionTitle
                    subHeading="At a Glance!"
                    heading="PAYMENT HISTORY"
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
                <title>Bistro Boss | Payment History</title>
            </Helmet>
            <SectionTitle subHeading="At a Glance!" heading="PAYMENT HISTORY" />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg space-y-6">
                <p className="font-bold text-2xl">
                    Total Payments: {payments.length}
                </p>

                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        <thead className="bg-[#D1A054] text-white font-semibold text-base">
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>TOTAL PRICE</th>
                                <th>PAYMENT DATE</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[#737373] text-base">
                            {payments.map((payment, idx) => (
                                <tr key={payment._id}>
                                    <td>{idx + 1}</td>
                                    <td>{payment.tnxId}</td>
                                    <td>{payment.amount}</td>
                                    <td>
                                        {moment(payment.date).format(
                                            "D MMMM  YYYY, h:mm:ss a"
                                        )}
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

export default PaymentHistory;
