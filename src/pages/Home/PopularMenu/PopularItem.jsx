import PropTypes from "prop-types";

const PopularItem = ({ popularItem }) => {
    return (
        <div className="flex gap-3">
            <div className="w-[30%]">
                <img
                    src={popularItem.image}
                    alt={popularItem.name}
                    className="w-full rounded-b-full rounded-r-full"
                />
            </div>
            <div className="w-[60%]">
                <h3 className="font-cinzel text-xl text-[#151515]">
                    {popularItem.name} ------------------
                </h3>
                <p className="text-[#737373]">{popularItem.recipe}</p>
            </div>
            <div className="w-[10%]">
                <p className="text-[#BB8506] text-xl">${popularItem.price}</p>
            </div>
        </div>
    );
};

PopularItem.propTypes = {
    popularItem: PropTypes.object.isRequired,
};

export default PopularItem;
