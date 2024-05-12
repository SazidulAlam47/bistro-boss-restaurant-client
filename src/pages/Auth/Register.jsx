import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OtherLogin from "./OtherLogin";
import { AuthContext } from "../../providers/AuthProvider";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateInfo } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");

        if (name === "") {
            setError("Please enter your name");
            return;
        } else if (email === "") {
            setError("Please enter your email address.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email");
            return;
        } else if (password === "") {
            setError("Please fill in the password");
            return;
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        } else if (!/[a-z]/.test(password) && !/[A-Z]/.test(password)) {
            setError("Password must contain at least one letter");
            return;
        } else if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            return;
        } else if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number");
            return;
        } else if (
            !/(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
        ) {
            setError("Password must contain at least one special character");
            return;
        }
        setError(""); // clear the error message
        createUser(email, password)
            .then((result) => {
                const profile = {
                    displayName: name,
                };
                updateInfo(result.user, profile)
                    .then(() => {
                        console.log("profile updated", result.user);
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.error(error.message);
                    });
            })
            .catch((err) => {
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
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div
                className="container mx-auto px-3 md:px-6"
                style={{
                    backgroundImage: "url(/images/others/authentication.png)",
                    boxShadow: "4px 4px 10px #00000054",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-20 py-14">
                    <div className="order-1 lg:order-2">
                        <img src="/images/others/authentication2.png" alt="" />
                    </div>
                    <div className="order-2 lg:order-1">
                        <h2 className="text-center font-bold text-4xl">
                            Register
                        </h2>
                        <form
                            onSubmit={handleRegister}
                            className="card-body pb-4"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
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
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D1A054] text-white hover:bg-[#d19f54ea]">
                                    Register
                                </button>
                                {error && (
                                    <p className="text-red-600 pt-2">{error}</p>
                                )}
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
                            <OtherLogin location={location} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
