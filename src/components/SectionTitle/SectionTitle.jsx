import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center max-w-96 mx-auto">
            <p className="text-[#D99904] text-xl italic">---{subHeading}---</p>
            <h1 className="uppercase text-[#151515] text-4xl py-5 border-y-4 border-[#E8E8E8] my-4">
                {heading}
            </h1>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
};

export default SectionTitle;
