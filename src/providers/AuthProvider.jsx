import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    GithubAuthProvider,
    TwitterAuthProvider,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import checkEmail from "../utils/checkEmail";
import displayError from "../utils/displayError";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const twitterLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, twitterProvider);
    };

    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateInfo = (user, profile) => {
        Object.assign(user, profile);
        return updateProfile(user, profile);
    };

    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser ", currentUser);
            if (currentUser) {
                setUser(currentUser);
                const email = currentUser.email;
                axiosPublic.post("/auth/jwt", { email }).then((res) => {
                    console.log(res.data);
                    setLoading(false);
                });
                // verify email
                if (!currentUser.emailVerified) {
                    sendEmailVerification(currentUser)
                        .then(() => {
                            checkEmail(
                                currentUser.email,
                                "to verify your email"
                            );

                            signOut(auth)
                                .then(() => {
                                    console.log("user not verified");
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    displayError(err);
                                });
                            setUser(null);
                        })
                        .catch((err) => {
                            console.log(err.message);
                            displayError(err);
                        });
                }
            } else {
                setUser(null);
                axiosPublic.get("/auth/logout").then((res) => {
                    console.log(res.data);
                    setLoading(false);
                });
            }
        });
        return () => {
            unSubscribe();
        };
    }, [user, axiosPublic]);

    const authInfo = {
        user,
        loading,
        googleLogin,
        twitterLogin,
        githubLogin,
        createUser,
        signInWithPassword,
        updateInfo,
        logOut,
        passwordReset,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
