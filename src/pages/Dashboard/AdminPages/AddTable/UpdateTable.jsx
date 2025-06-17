import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateTable = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const res = await axiosPublic.get(`/tables/${id}`);
                setValue("tableNumber", res.data.tableNumber);
                setValue("seats", res.data.seats);
                setValue("location", res.data.location || "null");
            } catch {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch table data.",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchTable();
    }, [id, axiosPublic, setValue]);

    const onSubmit = async (data) => {
        const tableData = {
            tableNumber: data.tableNumber,
            seats: Number(data.seats),
            location: data.location !== "null" ? data.location : undefined,
        };
        try {
            const res = await axiosSecure.patch(`/tables/${id}`, tableData);
            if (res.data.matchedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Table Updated!",
                    text: "The table has been updated successfully.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate("/dashboard/manage-tables");
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
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
            <SectionTitle heading="Update Table" subHeading="What's update?" />
            <div className="bg-[#F3F3F3] px-5 py-6 sm:p-10 md:p-11 rounded-md max-w-2xl mx-auto">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body p-0"
                >
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text font-medium">
                                Table Number*
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Table Number"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.tableNumber && "border-red-600"
                            }`}
                            {...register("tableNumber", {
                                required: "Please enter Table Number.",
                            })}
                        />
                        {errors.tableNumber && (
                            <p className="text-red-600 pt-1">
                                {errors.tableNumber.message}
                            </p>
                        )}
                    </label>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="form-control lg:w-1/2">
                            <div className="label">
                                <span className="label-text font-medium">
                                    Seats*
                                </span>
                            </div>
                            <input
                                type="number"
                                min="1"
                                placeholder="Number of Seats"
                                className={`input input-bordered border-[#E8E8E8] ${
                                    errors.seats && "border-red-600"
                                }`}
                                {...register("seats", {
                                    required: "Please enter number of seats.",
                                    min: {
                                        value: 1,
                                        message: "At least 1 seat required.",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.seats && (
                                <p className="text-red-600 pt-1">
                                    {errors.seats.message}
                                </p>
                            )}
                        </label>
                        <label className="form-control lg:w-1/2">
                            <div className="label">
                                <span className="label-text font-medium">
                                    Location
                                </span>
                            </div>
                            <select
                                className="select w-full select-bordered border-[#E8E8E8]"
                                {...register("location")}
                                defaultValue="null"
                            >
                                <option value="null">
                                    Select a location (optional)
                                </option>
                                <option value="indoor">Indoor</option>
                                <option value="patio">Patio</option>
                                <option value="balcony">Balcony</option>
                            </select>
                        </label>
                    </div>
                    <div className="mt-5">
                        <button className="inline-flex gap-2 sm:gap-3 items-center py-3 sm:py-4 px-5 sm:px-6 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                            <span className="font-medium sm:font-bold text-lg">
                                Update Table
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateTable;
