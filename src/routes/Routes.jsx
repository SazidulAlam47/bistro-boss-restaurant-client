import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivetRoute";
import ForgotPass from "../pages/Auth/ForgotPass";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Cart from "../pages/Dashboard/Cart/Cart";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "menu",
                element: <Menu />,
            },
            {
                path: "shop/",
                element: <Shop />,
            },
            {
                path: "shop/:category",
                element: <Shop />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgotPass />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: "",
                element: <Navigate to="/dashboard/home" />,
            },
            {
                path: "home",
                element: <DashboardHome />,
            },
            {
                path: "reservation",
                element: <Reservation />,
            },
            {
                path: "payment",
                element: <PaymentHistory />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "review",
                element: <AddReview />,
            },
            {
                path: "booking",
                element: <MyBooking />,
            },
        ],
    },
]);

export default router;
