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
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Cart from "../pages/Dashboard/Cart/Cart";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Users from "../pages/Dashboard/AdminPages/Users/Users";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashboard/AdminPages/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/AdminPages/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/AdminPages/AddItems/UpdateItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/AdminPages/AdminHome/AdminHome";
import ManageOrders from "../pages/Dashboard/AdminPages/ManageOrders/ManageOrders";
import OrderDetails from "../pages/Dashboard/AdminPages/OrderDetails/OrderDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddTable from "../pages/Dashboard/AdminPages/AddTable/AddTable";
import ManageTables from "../pages/Dashboard/AdminPages/ManageTables/ManageTables";
import UpdateTable from "../pages/Dashboard/AdminPages/AddTable/UpdateTable";
import BookTable from "../pages/Dashboard/BookTable/BookTable";
import MyBookedTables from "../pages/Dashboard/MyBookedTables/MyBookedTables";
import ManageBookedTables from "../pages/Dashboard/AdminPages/ManageBookedTables/ManageBookedTables";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to="/dashboard/home" />,
            },
            {
                path: "home",
                element: <UserHome />,
            },

            {
                path: "payment-history",
                element: <PaymentHistory />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "order-details/:id",
                element: <OrderDetails />,
            },
            {
                path: "book-table",
                element: <BookTable />,
            },
            {
                path: "book-table",
                element: <BookTable />,
            },
            {
                path: "booked-tables",
                element: <MyBookedTables />,
            },
            {
                path: "book-table",
                element: <BookTable />,
            },
            // admin only routes
            {
                path: "admin-home",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                ),
            },
            {
                path: "add-items",
                element: (
                    <AdminRoute>
                        <AddItems />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-items",
                element: (
                    <AdminRoute>
                        <ManageItems />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-item/:id",
                element: (
                    <AdminRoute>
                        <UpdateItems />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-orders",
                element: (
                    <AdminRoute>
                        <ManageOrders />
                    </AdminRoute>
                ),
            },
            {
                path: "add-table",
                element: (
                    <AdminRoute>
                        <AddTable />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-tables",
                element: (
                    <AdminRoute>
                        <ManageTables />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-booked-tables",
                element: (
                    <AdminRoute>
                        <ManageBookedTables />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-table/:id",
                element: (
                    <AdminRoute>
                        <UpdateTable />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
