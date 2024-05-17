import { FaPaperPlane } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        Swal.fire({
            icon: "success",
            title: "Thank you for your inquiry!",
            text: "We have received your message and will be in touch shortly.",
            showConfirmButton: false,
            timer: 2500,
        });
        reset();
    };

    return (
        <section className="container mx-auto px-3 md:px-6 py-12 space-y-10">
            <SectionTitle
                heading="CONTACT FORM"
                subHeading="Send Us a Message"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body bg-[#F3F3F3] px-5 py-6 sm:p-10 md:p-16"
            >
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Name*
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.name && "border-red-600"
                            }`}
                            {...register("name", {
                                required: "Please enter your name",
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-600 pt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-medium">
                                Email*
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className={`input input-bordered border-[#E8E8E8] ${
                                errors.email && "border-red-600"
                            }`}
                            {...register("email", {
                                required: "Please enter your email address.",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600 pt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </label>
                </div>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text font-medium">Phone*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        className={`input input-bordered border-[#E8E8E8] ${
                            errors.phone && "border-red-600"
                        }`}
                        {...register("phone", {
                            required: "Please enter your phone number.",
                            pattern: {
                                value: /^\+\d+$/,
                                message:
                                    "Please enter a valid phone number starting with a '+' and followed by the country code.",
                            },
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-600 pt-1">
                            {errors.phone.message}
                        </p>
                    )}
                </label>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text font-medium">Message*</span>
                    </div>
                    <textarea
                        className={`textarea textarea-bordered h-44 sm:h-60 border-[#E8E8E8] ${
                            errors.message && "border-red-600"
                        }`}
                        placeholder="Write your message here"
                        {...register("message", {
                            required: "Please enter your Message",
                        })}
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-600 pt-1">
                            {errors.message.message}
                        </p>
                    )}
                </label>
                <div className="mt-6 text-center">
                    <button className="inline-flex gap-2 sm:gap-3 items-center py-3 sm:py-4 px-5 sm:px-6 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                        <span className="font-medium sm:font-bold text-lg">
                            Send Message
                        </span>
                        <FaPaperPlane size={20} />
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;
