import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const BookTable = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { tableId: "null" },
    });

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const res = await axiosPublic.get("/tables");
                setTables(res.data);
            } catch {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch tables.",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchTables();
    }, [axiosPublic]);

    const onSubmit = async (data) => {
        const reservationData = {
            tableId: data.tableId,
            reservationDate: data.reservationDate,
            numberOfGuests: Number(data.numberOfGuests),
            durationMinutes: Number(data.durationMinutes),
        };
        try {
            const res = await axiosSecure.post(
                "/reservations",
                reservationData
            );
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Reservation Successful!",
                    text: "Your table has been reserved.",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message || "Something went wrong!",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center bg-white rounded-xl my-8">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-3 md:px-6 py-12 space-y-10">
            <Helmet>
                <title>Bistro Boss | Book Table</title>
            </Helmet>
            <SectionTitle
                heading="BOOK A TABLE"
                subHeading="Reserve your spot!"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body bg-[#F3F3F3] px-5 py-6 sm:p-10 md:p-16 rounded-md max-w-2xl mx-auto"
            >
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Select Table*
                            </span>
                        </div>
                        <select
                            className={`select w-full select-bordered border-[#E8E8E8] ${
                                errors.tableId && "border-red-600"
                            }`}
                            {...register("tableId", {
                                required: "Please select a table.",
                            })}
                            defaultValue="null"
                        >
                            <option disabled value="null">
                                Select a table
                            </option>
                            {tables.map((table) => (
                                <option value={table._id} key={table._id}>
                                    Table #{table.tableNumber} ({table.seats}{" "}
                                    seats
                                    {table.location
                                        ? `, ${table.location}`
                                        : ""}
                                    )
                                </option>
                            ))}
                        </select>
                        {errors.tableId && (
                            <p className="text-red-600 pt-1">
                                {errors.tableId.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Number of Guests*
                            </span>
                        </div>
                        <input
                            type="number"
                            min="1"
                            placeholder="Guests"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.numberOfGuests && "border-red-600"
                            }`}
                            {...register("numberOfGuests", {
                                required: "Please enter number of guests.",
                                min: {
                                    value: 1,
                                    message: "At least 1 guest required.",
                                },
                                valueAsNumber: true,
                            })}
                        />
                        {errors.numberOfGuests && (
                            <p className="text-red-600 pt-1">
                                {errors.numberOfGuests.message}
                            </p>
                        )}
                    </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 mt-5">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Reservation Date & Time*
                            </span>
                        </div>
                        <input
                            type="datetime-local"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.reservationDate && "border-red-600"
                            }`}
                            {...register("reservationDate", {
                                required: "Please select date and time.",
                            })}
                        />
                        {errors.reservationDate && (
                            <p className="text-red-600 pt-1">
                                {errors.reservationDate.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Duration (minutes)*
                            </span>
                        </div>
                        <input
                            type="number"
                            min="1"
                            placeholder="Duration in minutes"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.durationMinutes && "border-red-600"
                            }`}
                            {...register("durationMinutes", {
                                required: "Please enter duration.",
                                min: {
                                    value: 1,
                                    message: "At least 1 minute required.",
                                },
                                valueAsNumber: true,
                            })}
                        />
                        {errors.durationMinutes && (
                            <p className="text-red-600 pt-1">
                                {errors.durationMinutes.message}
                            </p>
                        )}
                    </label>
                </div>
                <div className="mt-5">
                    <button className="inline-flex gap-2 sm:gap-3 items-center py-3 sm:py-4 px-5 sm:px-6 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                        <span className="font-medium sm:font-bold text-lg">
                            Book Table
                        </span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BookTable;
