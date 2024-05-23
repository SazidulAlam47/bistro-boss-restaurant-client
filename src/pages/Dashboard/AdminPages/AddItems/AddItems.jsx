import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ImSpoonKnife } from "react-icons/im";
import "./AddItems.css";
import capitalize from "../../../../utils/capitalize";
import { BsCurrencyDollar } from "react-icons/bs";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddItems = () => {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);
        const imgApiUrl = `https://api.imgbb.com/1/upload?&key=${
            import.meta.env.VITE_IMG_BB_KEY
        }`;

        const config = {
            headers: {
                "content-Type": "multipart/form-data",
            },
        };

        try {
            const imgRes = await axios.post(imgApiUrl, imageFile, config);
            const imgUrl = imgRes?.data?.data?.url;

            const uploadData = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: imgUrl,
            };

            try {
                const uploadRes = await axiosSecure.post("/menus", uploadData);
                console.log(uploadRes.data);
                if (uploadRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Item Added!",
                        text: "The Item has been added successfully.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            } catch {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "The selected image could not be uploaded. Please try a different image.",
            });
        }
    };
    return (
        <section className="container mx-auto px-3 md:px-6 py-12 space-y-10">
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <SectionTitle heading="ADD AN ITEM" subHeading="What's new?" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body bg-[#F3F3F3] px-5 py-6 sm:p-10 md:p-16 rounded-md"
            >
                <label className="form-control">
                    <div className="label">
                        <span className="label-text font-medium">
                            Recipe name*
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Recipe name"
                        className={`input input-bordered border-[#E8E8E8] ${
                            errors.name && "border-red-600"
                        }`}
                        {...register("name", {
                            required: "Please enter Recipe name.",
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-600 pt-1">
                            {errors.name.message}
                        </p>
                    )}
                </label>
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Category*
                            </span>
                        </div>
                        <select
                            className={`select w-full select-bordered border-[#E8E8E8] ${
                                errors.category && "border-red-600"
                            } `}
                            {...register("category", {
                                validate: (value) => {
                                    return (
                                        value !== "null" ||
                                        "Please select a category"
                                    );
                                },
                            })}
                            defaultValue="null"
                        >
                            <option disabled value="null">
                                Select a category
                            </option>
                            {categories.map((category, idx) => (
                                <option value={category} key={idx}>
                                    {capitalize(category)}
                                </option>
                            ))}
                        </select>

                        {errors.category && (
                            <p className="text-red-600 pt-1">
                                {errors.category.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Price*
                            </span>
                        </div>
                        <label
                            className={`input input-bordered flex items-center gap-2 ${
                                errors.price && "border-red-600"
                            }`}
                        >
                            <BsCurrencyDollar />
                            <input
                                type="text"
                                placeholder="Price"
                                className={"grow border-[#E8E8E8]"}
                                {...register("price", {
                                    required: "Please enter price.",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Invalid price",
                                    },
                                })}
                            />
                        </label>
                        {errors.price && (
                            <p className="text-red-600 pt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </label>
                </div>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text font-medium">
                            Recipe Details*
                        </span>
                    </div>
                    <textarea
                        className={`textarea textarea-bordered h-44 sm:h-60 border-[#E8E8E8] ${
                            errors.recipe && "border-red-600"
                        }`}
                        placeholder="Recipe Details"
                        {...register("recipe", {
                            required: "Please enter Recipe Details",
                        })}
                    ></textarea>
                    {errors.recipe && (
                        <p className="text-red-600 pt-1">
                            {errors.recipe.message}
                        </p>
                    )}
                </label>
                <div className="mt-3">
                    <input
                        type="file"
                        className="file-input w-full max-w-xs upload"
                        {...register("image", {
                            required: "Please upload an image",
                        })}
                    />
                    {errors.image && (
                        <p className="text-red-600 pt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>
                <div className="mt-5">
                    <button className="inline-flex gap-2 sm:gap-3 items-center py-3 sm:py-4 px-5 sm:px-6 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                        <span className="font-medium sm:font-bold text-lg">
                            Add Item
                        </span>
                        <ImSpoonKnife size={20} />
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddItems;
