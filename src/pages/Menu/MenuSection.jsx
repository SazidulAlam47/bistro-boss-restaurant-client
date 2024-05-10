import { Link } from "react-router-dom";
import Cover from "../../components/Cover/Cover";
import ShowMenus from "../../components/ShowMenus/ShowMenus";
import BtnWhite from "../../components/Buttons/BtnWhite";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import PropTypes from "prop-types";

const MenuSection = ({
    cover,
    heading,
    img,
    children: description,
    subHeading,
    category,
}) => {
    return (
        <section className="pt-12 pb-6 space-y-12">
            {cover ? (
                <Cover img={img} heading={heading}>
                    {description}
                </Cover>
            ) : (
                <SectionTitle subHeading={subHeading} heading={heading} />
            )}

            <div className="container mx-auto px-3 md:px-6 space-y-12">
                <ShowMenus category={category} />
                <div className="text-center">
                    <Link
                        to={
                            category === "offered"
                                ? "/shop"
                                : `/shop/${category}`
                        }
                    >
                        <BtnWhite>Order Your Favorite Food</BtnWhite>
                    </Link>
                </div>
            </div>
        </section>
    );
};

MenuSection.propTypes = {
    cover: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    img: PropTypes.string,
    children: PropTypes.string,
    category: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
};

MenuSection.defaultProps = {
    cover: false,
};

export default MenuSection;
