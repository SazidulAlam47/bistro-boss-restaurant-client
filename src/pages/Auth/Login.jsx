import { useContext, useEffect, useRef, useState } from "react";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye, IoEyeOff } from "react-icons/io5";
import OtherLogin from "./OtherLogin";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import displayError from "../../utils/displayError";
import checkEmail from "../../utils/checkEmail";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const captchaRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaError, setCaptchaError] = useState("");

    console.log(location);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (data) => {
        // validate captcha
        const user_captcha_value = captchaRef.current.value;
        if (user_captcha_value === "") {
            setCaptchaError("Please fill in the captcha");
            captchaRef.current.focus();
            return;
        } else if (!validateCaptcha(user_captcha_value)) {
            setCaptchaError("Captcha Does Not Match");
            captchaRef.current.value = "";
            captchaRef.current.focus();
            return;
        }
        setCaptchaError(""); // validation succeeded, remove the error

        // login
        const { email, password } = data;
        signInWithPassword(email, password)
            .then((result) => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    checkEmail(result.user.email, "to verify your email");
                } else {
                    location.state ? navigate(location.state) : navigate("/");
                    toast.success("Login Successful");
                }
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
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div
                className="container mx-auto px-3 md:px-6"
                style={{
                    backgroundImage: "url(/images/others/authentication.png)",
                    boxShadow: "4px 4px 10px #00000054",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-2 sm:px-20 py-14">
                    <div>
                        <img src="/images/others/authentication2.png" alt="" />
                    </div>
                    <div>
                        <h2 className="text-center font-bold text-4xl">
                            Login
                        </h2>
                        <form
                            onSubmit={handleSubmit(handleLogin)}
                            className="card-body pb-4 px-0 xl:px-5"
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
                                            value: /\S+@\S+\.\S+/,
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
                                        required: "Please fill in the password",
                                    })}
                                    placeholder="Enter your password"
                                    className={`input input-bordered ${
                                        errors.password && "border-red-600"
                                    }`}
                                />
                                <span
                                    className="cursor-pointer absolute right-4"
                                    style={{ top: "51px" }}
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
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    ref={captchaRef}
                                    type="text"
                                    placeholder="Type the word above"
                                    className={`input input-bordered ${
                                        captchaError && "border-red-600"
                                    }`}
                                />
                                {captchaError && (
                                    <p className="text-red-600 pt-1">
                                        {captchaError}
                                    </p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D1A054B3] text-white hover:bg-[#d19f54ea]">
                                    Login
                                </button>
                                <Link
                                    to="/forgot-password"
                                    className="label-text-alt link link-hover text-sm text-center mt-4"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="font-medium text-xl text-[#D1A054]">
                                New here?{" "}
                                <Link to="/register" className="font-bold">
                                    Create a New Account
                                </Link>
                            </p>
                            <p className="font-medium text-xl pt-3">
                                Or sign in with
                            </p>
                            <OtherLogin location={location} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
