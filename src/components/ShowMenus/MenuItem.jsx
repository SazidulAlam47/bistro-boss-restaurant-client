import PropTypes from "prop-types";
import "./MenuItem.css";

const PopularItem = ({ item }) => {
    return (
        <div className="flex gap-3 relative">
            <div className="w-[30%] sm:w-[20%] menu-img ">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-bl-full rounded-br-full rounded-tr-full hover:rounded-tl-full hover:rounded-tr-none transition-all duration-300"
                />
            </div>
            <div className="absolute left-32 thumbnail shadow-2xl">
                <img src={item.image} alt={item.name} className="rounded" />
            </div>
            <div className="w-[60%] sm:w-[70%]">
                <h3 className="font-cinzel text-xl text-[#151515]">
                    {item.name}{" "}
                    <span className="hidden md:inline-block">
                        -------------
                    </span>
                </h3>
                <p className="text-[#737373]">{item.recipe}</p>
            </div>
            <div className="w-[10%]">
                <p className="text-[#BB8506] text-xl">${item.price}</p>
            </div>
        </div>
    );
};

PopularItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default PopularItem;
