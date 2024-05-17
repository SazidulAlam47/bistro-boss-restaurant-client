import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import checkEmail from "../../utils/checkEmail";
import displayError from "../../utils/displayError";

const ForgotPass = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { passwordReset } = useContext(AuthContext);

    const handleForgotPass = (data) => {
        const { email } = data;
        passwordReset(email)
            .then(() => {
                checkEmail(email, "to reset your password");
            })
            .catch((err) => {
                console.log(err);
                displayError(err);
            });
    };

    return (
        <div
            className="pt-36 pb-14"
            style={{
                backgroundImage: "url(/images/others/authentication.png)",
            }}
        >
            <Helmet>
                <title>Bistro Boss | Forgot Password</title>
            </Helmet>
            <div
                className="container mx-auto px-3 md:px-6"
                style={{
                    backgroundImage: "url(/images/others/authentication.png)",
                    boxShadow: "4px 4px 10px #00000054",
                }}
            >
                <div className="md:max-w-4xl mx-auto lg:px-20 py-14">
                    <h2 className="text-center font-bold text-4xl">
                        Forgot Password
                    </h2>
                    <form
                        onSubmit={handleSubmit(handleForgotPass)}
                        className="card-body pb-4"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                {...register("email", {
                                    required:
                                        "Please enter your email address.",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Invalid email",
                                    },
                                })}
                                placeholder="Your email"
                                className={`input input-bordered ${
                                    errors.email && "border-red-600"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-600 pt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D1A054B3] text-white hover:bg-[#d19f54ea]">
                                Reset Password
                            </button>
                        </div>
                    </form>
                    <div className="text-center space-y-2">
                        <p className="font-medium text-xl text-[#D1A054]">
                            Remember password?{" "}
                            <Link to="/login" className="font-bold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
