import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import displayError from "../../utils/displayError";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateInfo } = useContext(AuthContext);

    const handlePasswordValidate = (password) => {
        if (password === "") {
            return "Please fill in the password";
        } else if (password.length < 6) {
            return "Password must be at least 6 characters long";
        } else if (!/[a-z]/.test(password) && !/[A-Z]/.test(password)) {
            return "Password must contain at least one letter";
        } else if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        } else if (
            !/(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
        ) {
            return "Password must contain at least one special character";
        }
        return true;
    };

    const handleRegister = (data) => {
        const { name, email, password } = data;
        createUser(email, password)
            .then((result) => {
                const profile = {
                    displayName: name,
                };
                updateInfo(result.user, profile)
                    .then(() => {
                        axiosPublic
                            .put("/users", {
                                name,
                                email,
                            })
                            .then((res) => {
                                console.log(res.data);
                                console.log(
                                    "profile updated and saved in database",
                                    result.user
                                );
                                navigate("/login");
                            });
                    })
                    .catch((error) => {
                        console.error(error.message);
                    });
            })
            .catch((err) => {
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
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div
                className="container mx-auto px-3 md:px-6"
                style={{
                    backgroundImage: "url(/images/others/authentication.png)",
                    boxShadow: "4px 4px 10px #00000054",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-2 sm:px-20 py-14">
                    <div className="order-1 lg:order-2">
                        <img src="/images/others/authentication2.png" alt="" />
                    </div>
                    <div className="order-2 lg:order-1">
                        <h2 className="text-center font-bold text-4xl">
                            Register
                        </h2>
                        <form
                            onSubmit={handleSubmit(handleRegister)}
                            className="card-body pb-4 px-0 xl:px-5"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", {
                                        required: "Please enter your name",
                                    })}
                                    placeholder="Your full name"
                                    className={`input input-bordered ${
                                        errors.name && "border-red-600"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-600 pt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
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
                                            value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        validate: handlePasswordValidate,
                                    })}
                                    placeholder="Enter your password"
                                    className={`input input-bordered ${
                                        errors.password && "border-red-600"
                                    }`}
                                />
                                <span
                                    className="cursor-pointer absolute right-4"
                                    style={{ top: "50px" }}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <IoEyeOff className="w-5 h-5" />
                                    ) : (
                                        <IoEye className="w-5 h-5" />
                                    )}
                                </span>
                                {errors.password && (
                                    <p className="text-red-600 pt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D1A054] text-white hover:bg-[#d19f54ea]">
                                    Register
                                </button>
                            </div>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="font-medium text-xl text-[#D1A054]">
                                Already registered?{" "}
                                <Link to="/login" className="font-bold">
                                    Go to log in
                                </Link>
                            </p>
                            <p className="font-medium text-xl pt-3">
                                Or sign in with
                            </p>
                            <SocialLogin location={location} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
