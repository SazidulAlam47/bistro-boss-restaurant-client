import { Helmet } from "react-helmet-async";
import { FaCreditCard, FaTruck, FaUsers } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: status, isPending: isStatusPending } = useQuery({
        queryKey: ["admin-status"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-status");
            return res.data;
        },
    });

    const { data: orders = [] } = useQuery({
        queryKey: ["admin-order-status"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-order-status");
            return res.data;
        },
    });

    // bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${
            x + width / 2
        },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
            y + height
        } ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        // eslint-disable-next-line react/prop-types
        const { fill, x, y, width, height } = props;

        return (
            <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
        );
    };

    // pi chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = orders.map((order) => {
        return {
            name: order.category,
            value: order.revenue,
        };
    });

    console.log(pieChartData);

    return (
        <section className="space-y-5">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <h1 className="font-cinzel font-semibold text-3xl">
                Hi, Welcome Back!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] justify-center py-9 text-white rounded-xl">
                    <FaCreditCard size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            ${isStatusPending ? "..." : status.revenue}
                        </p>
                        <p className="text-2xl">Revenue</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] justify-center py-9 text-white rounded-xl">
                    <FaUsers size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isStatusPending ? "..." : status.customers}
                        </p>
                        <p className="text-2xl">Customers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] justify-center py-9 text-white rounded-xl">
                    <MdFastfood size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isStatusPending ? "..." : status.products}
                        </p>
                        <p className="text-2xl">Products</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] justify-center py-9 text-white rounded-xl">
                    <FaTruck size={60} />
                    <div>
                        <p className="font-extrabold text-4xl">
                            {isStatusPending ? "..." : status.orders}
                        </p>
                        <p className="text-2xl">Orders</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 bg-white rounded-lg p-5">
                <div className="mx-auto">
                    <h2 className="text-center text-xl font-semibold">
                        <span className="border-b-2 pb-1 border-[#444]">
                            Sold Quantity
                        </span>
                    </h2>
                    <BarChart
                        width={500}
                        height={300}
                        data={orders}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar
                            dataKey="quantity"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {orders.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % 20]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="mx-auto">
                    <h2 className="text-center text-xl font-semibold">
                        <span className="border-b-2 pb-1 border-[#444]">
                            Total Revenue
                        </span>
                    </h2>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </section>
    );
};

export default AdminHome;
