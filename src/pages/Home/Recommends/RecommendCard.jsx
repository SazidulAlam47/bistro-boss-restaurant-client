import PropTypes from "prop-types";

const RecommendCard = ({ recommend }) => {
    return (
        <div className="bg-[#F3F3F3] flex flex-col text-center">
            <div className="pb-6">
                <img
                    src={recommend.image}
                    alt={recommend.name}
                    className="w-full"
                />
            </div>
            <h4 className="font-semibold text-2xl pb-2">{recommend.name}</h4>
            <p className="text-[#151515] pb-6 px-6 grow">{recommend.recipe}</p>
            <div className="pb-6">
                <button className="btn btn-ghost border-0 border-b-2 text-[#BB8506] hover:text-[#E8E8E8] bg-[#E8E8E8] border-[#BB8506] hover:border-[#BB8506] hover:bg-[#BB8506] uppercase">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

RecommendCard.propTypes = {
    recommend: PropTypes.node.isRequired,
};

export default RecommendCard;
