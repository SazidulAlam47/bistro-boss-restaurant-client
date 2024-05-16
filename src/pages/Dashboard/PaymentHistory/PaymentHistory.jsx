import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Payment History</title>
            </Helmet>
            <SectionTitle subHeading="At a Glance!" heading="PAYMENT HISTORY" />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg space-y-6">
                <p className="font-bold text-2xl">Total Payments: 6</p>
                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        <thead className="bg-[#D1A054] text-white font-semibold text-base">
                            <tr>
                                <th>EMAIL</th>
                                <th>CATEGORY</th>
                                <th>TOTAL PRICE</th>
                                <th>PAYMENT DATE</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[#737373] text-base">
                            <tr>
                                <td>info@gmail.com</td>
                                <td>Food Order</td>
                                <td>$71.5</td>
                                <td>Monday, April 10, 2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;
