import PropTypes from "prop-types";

const BtnWhite = ({ children }) => {
    return (
        <button
            className="btn btn-ghost border-0 border-b-2 border-[#1F2937] hover:border-[#1F2937] hover:bg-[#00000010]"
            style={{ boxShadow: "0px 0px 20px #00000024" }}
        >
            {children}
        </button>
    );
};

BtnWhite.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BtnWhite;
