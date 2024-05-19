import PropTypes from "prop-types";
import "./FoodCard.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import useCarts from "../../hooks/useCarts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { refetch } = useCarts();

    const handleAddToCart = () => {
        if (user && user.email) {
            const data = {
                userEmail: user.email,
                userName: user.displayName,
                foodId: item._id,
                foodName: item.name,
                foodPrice: item.price,
                foodImage: item.image,
                foodCategory: item.category,
            };
            axiosSecure.post("/carts", data).then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success(`${item.name} Added to cart!`, {
                        duration: 3300,
                    });
                    refetch();
                }
            });
        } else {
            navigate("/login", { state: `/shop/${item.category}` });
        }
    };

    return (
        <div className="bg-[#F3F3F3] flex flex-col text-center relative box-shw">
            <p className="absolute right-4 top-4 bg-[#111827] text-white font-semibold py-3 px-6">
                ${item.price}
            </p>
            <div className="pb-6">
                <img src={item.image} alt={item.name} className="w-full h-64" />
            </div>
            <h4 className="font-semibold text-2xl pb-2">{item.name}</h4>
            <p className="text-[#151515] pb-6 px-6 grow">{item.recipe}</p>
            <div className="pb-6">
                <button
                    onClick={handleAddToCart}
                    className="btn btn-ghost border-0 border-b-2 text-[#BB8506] hover:text-white bg-[#E8E8E8] border-[#BB8506] hover:border-[#BB8506] hover:bg-[#BB8506] uppercase"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FoodCard;
