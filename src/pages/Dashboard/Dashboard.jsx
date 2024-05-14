import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <p>This is Dashboard</p>
            <Outlet />
        </div>
    );
};

export default Dashboard;
