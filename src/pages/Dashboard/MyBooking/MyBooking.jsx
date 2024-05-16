import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MyBooking = () => {
    return (
        <>
            <Helmet>
                <title>Bistro Boss | My Bookings</title>
            </Helmet>
            <SectionTitle
                subHeading="Excellent Ambience"
                heading="MY BOOKINGS"
            />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg space-y-6">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-2xl">
                        Total Bookings: 6
                    </span>
                    <span className="font-bold text-2xl">Total price: $45</span>
                    <button className="text-white bg-[#D1A054] hover:bg-[#e9af59] px-5 py-2 rounded-md font-medium active:scale-95 transition-all ">
                        Pay
                    </button>
                </div>
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

export default MyBooking;
