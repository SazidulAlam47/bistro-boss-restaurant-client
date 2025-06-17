import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";

const MyBookedTables = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reservations = [], isPending } = useQuery({
        queryKey: ["my-booked-tables"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reservations/me");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <>
                <Helmet>
                    <title>Bistro Boss | My Booked Tables</title>
                </Helmet>
                <SectionTitle
                    subHeading="Your reservations"
                    heading="My Booked Tables"
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
                <title>Bistro Boss | My Booked Tables</title>
            </Helmet>
            <SectionTitle
                subHeading="Your reservations"
                heading="My Booked Tables"
            />
            <div className="bg-white px-3 lg:px-10 py-10 my-8 rounded-lg space-y-6">
                <p className="font-bold text-2xl">
                    Total Reservations: {reservations.length}
                </p>

                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        <thead className="bg-[#D1A054] text-white font-semibold text-base">
                            <tr className="uppercase">
                                <th>#</th>
                                <th>Table Number</th>
                                <th>Guests</th>
                                <th>Date & Time</th>
                                <th>Duration (min)</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[#737373] text-base">
                            {reservations.map((reservation, idx) => (
                                <tr key={reservation._id}>
                                    <td>{idx + 1}</td>
                                    <td>{reservation.tableNumber}</td>
                                    <td>{reservation.numberOfGuests}</td>
                                    <td>
                                        {moment(
                                            reservation.reservationDate
                                        ).format("D MMM YYYY, h:mm a")}
                                    </td>
                                    <td>
                                        {reservation.durationMinutes || "-"}
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

export default MyBookedTables;
