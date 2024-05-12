import { useContext, useEffect, useRef, useState } from "react";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import OtherLogin from "./OtherLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithPassword, firebaseError, passwordReset } =
        useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    useEffect(() => {
        if (firebaseError) {
            setError(formatFirebaseError(firebaseError));
        }
    }, [firebaseError]);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        const captcha = form.get("captcha");
        console.log({ email, password, captcha });
        if (email === "") {
            setError("Please fill in the email address");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email");
            return;
        } else if (password === "") {
            setError("Please fill in the password");
            return;
        } else if (captcha === "") {
            setError("Please fill in the captcha");
            return;
        } else if (!validateCaptcha(captcha)) {
            setError("Captcha Does Not Match");
            return;
        }
        setError("");
        signInWithPassword(email, password)
            .then((result) => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setError("Please verify your email");
                } else {
                    location.state ? navigate(location.state) : navigate("/");
                    toast.success("Login Successful");
                }
            })
            .catch((err) => {
                setError(formatFirebaseError(err));
            });
    };

    const handleForgotPass = () => {
        const email = emailRef.current.value;
        console.log(email);
        if (email === "") {
            setError("Please fill in the email address to reset your password");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        passwordReset(email)
            .then(() => {
                Swal.fire({
                    title: "Please check your email",
                    text: `Please check your ${email} for a link to reset your password.`,
                    imageUrl: "https://i.ibb.co/D9Qg6M1/mail.png",
                    imageWidth: 128,
                    imageHeight: 128,
                    imageAlt: "Email",
                });
            })
            .catch((err) => {
                console.log(err);
                setError(formatFirebaseError(err));
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
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-20 py-14">
                    <div>
                        <img src="/images/others/authentication2.png" alt="" />
                    </div>
                    <div>
                        <h2 className="text-center font-bold text-4xl">
                            Login
                        </h2>
                        <form onSubmit={handleLogin} className="card-body pb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    ref={emailRef}
                                    type="text"
                                    name="email"
                                    placeholder="Your email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                <span
                                    className="cursor-pointer absolute right-4"
                                    style={{ bottom: "14px" }}
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
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    type="text"
                                    name="captcha"
                                    placeholder="Type the word above"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D1A054B3] text-white hover:bg-[#d19f54ea]">
                                    Login
                                </button>
                                {error && (
                                    <p className="text-red-600 pt-2">{error}</p>
                                )}
                                <span
                                    onClick={handleForgotPass}
                                    className="label-text-alt link link-hover text-sm text-center mt-4"
                                >
                                    Forgot password?
                                </span>
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
