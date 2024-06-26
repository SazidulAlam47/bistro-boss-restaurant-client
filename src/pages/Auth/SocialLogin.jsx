import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import displayError from "../../utils/displayError";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = ({ location }) => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { googleLogin, twitterLogin, githubLogin } = useContext(AuthContext);

    const successTask = (result) => {
        console.log(result.user);
        const name = result.user.displayName;
        const email = result.user.email;
        const image = result.user.photoURL;
        const user = { email, name, image };

        axiosPublic.put("/users", user).then((res) => {
            console.log(res.data);
            toast.success("Login Successful");
            // navigate
            if (result.user.emailVerified) {
                location.state ? navigate(location.state) : navigate("/");
            }
        });
    };

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                successTask(result);
            })
            .catch((err) => {
                displayError(err);
            });
    };

    const handleTwitter = () => {
        twitterLogin()
            .then((result) => {
                successTask(result);
            })
            .catch((err) => {
                displayError(err);
            });
    };

    const handleGithub = () => {
        githubLogin()
            .then((result) => {
                successTask(result);
            })
            .catch((err) => {
                displayError(err);
            });
    };

    return (
        <div className="flex gap-3 justify-center">
            <button
                onClick={handleGoogle}
                className="border-2 border-[#444444] p-3 rounded-full focus:scale-95"
            >
                <FaGoogle size={25} />
            </button>
            <button
                onClick={handleTwitter}
                className="border-2 border-[#444444] p-3 rounded-full focus:scale-95"
            >
                <FaXTwitter size={25} />
            </button>
            <button
                onClick={handleGithub}
                className="border-2 border-[#444444] p-3 rounded-full focus:scale-95"
            >
                <FaGithub size={25} />
            </button>
        </div>
    );
};

SocialLogin.propTypes = {
    location: PropTypes.object,
};

export default SocialLogin;
