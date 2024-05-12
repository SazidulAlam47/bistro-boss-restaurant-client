import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { FaXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Bounce, toast as toastify } from "react-toastify";
import toast from "react-hot-toast";

const OtherLogin = ({ location }) => {
    const navigate = useNavigate();
    const { googleLogin, twitterLogin, githubLogin } = useContext(AuthContext);

    const successTost = (result) => {
        console.log(result.user);

        // const email = result.user.email;
        // const user = { email };
        // handleJWT(user);

        toast.success("Login Successful");
        // navigate
        location.state ? navigate(location.state) : navigate("/");
    };

    const errorTost = (err) => {
        console.log(err.message);
        const errorMessage = formatFirebaseError(err);
        toastify.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    const handleTwitter = () => {
        twitterLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    const handleGithub = () => {
        githubLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    return (
        <div className="flex gap-3 justify-center">
            <button
                onClick={handleGoogle}
                className="border-2 border-[#444444] p-3 rounded-full"
            >
                <FaGoogle size={25} />
            </button>
            <button
                onClick={handleTwitter}
                className="border-2 border-[#444444] p-3 rounded-full"
            >
                <FaXTwitter size={25} />
            </button>
            <button
                onClick={handleGithub}
                className="border-2 border-[#444444] p-3 rounded-full"
            >
                <FaGithub size={25} />
            </button>
        </div>
    );
};

OtherLogin.propTypes = {
    location: PropTypes.object,
};

export default OtherLogin;
