import { Parallax } from "react-parallax";
import PropTypes from "prop-types";

const Cover = ({ page, img, heading, children }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="Bistro Boss"
            strength={-200}
        >
            <div
                className={`bg-black bg-opacity-50 text-white ${
                    page ? "mt-[100px] sm:mt-36" : "mt-10 sm:mt-24"
                } mb-10 sm:mb-24 mx-auto px-4 py-4 sm:py-12 sm:px-3 md:p-7 lg:p-16 xl:p-24 text-center w-full sm:w-11/12 md:w-2/3 space-y-2 lg:space-y-4`}
            >
                <h3
                    className={`font-cinzel ${
                        page
                            ? "text-5xl lg:text-6xl xl:text-7xl"
                            : "text-3xl lg:text-4xl xl:text-5xl"
                    } font-semibold `}
                >
                    {heading}
                </h3>
                <p className={`${page && "font-cinzel text-xl"} font-medium `}>
                    {children}
                </p>
            </div>
        </Parallax>
    );
};

Cover.propTypes = {
    page: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};

Cover.defaultProps = { page: false };

export default Cover;
