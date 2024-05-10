import PropTypes from "prop-types";
import "./OrderCard.css";

const OrderCard = ({ item }) => {
    return (
        <div className="bg-[#F3F3F3] flex flex-col text-center box-shw">
            <div className="pb-6">
                <img src={item.image} alt={item.name} className="w-full" />
            </div>
            <h4 className="font-semibold text-2xl pb-2">{item.name}</h4>
            <p className="text-[#151515] pb-6 px-6 grow">{item.recipe}</p>
            <div className="pb-6">
                <button className="btn btn-ghost border-0 border-b-2 text-[#BB8506] hover:text-[#E8E8E8] bg-[#E8E8E8] border-[#BB8506] hover:border-[#BB8506] hover:bg-[#BB8506] uppercase">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    item: PropTypes.node.isRequired,
};

export default OrderCard;
