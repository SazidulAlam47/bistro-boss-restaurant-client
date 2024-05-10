import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ShowMenus from "../../components/ShowMenus/ShowMenus";
import BtnWhite from "../../components/Buttons/BtnWhite";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* Page Cover */}
            <section>
                <Cover img="/images/menu/banner3.jpg" heading="OUR MENU" page>
                    Would you like to try a dish?
                </Cover>
            </section>
            {/* Popular section */}
            <section className="container mx-auto px-3 md:px-6 pt-12 pb-6 space-y-12">
                <SectionTitle subHeading="Don't miss" heading="TODAY'S OFFER" />
                <ShowMenus category="popular" />
                <div className="text-center">
                    <Link to="/shop">
                        <BtnWhite>ORDER YOUR FAVORITE FOOD</BtnWhite>
                    </Link>
                </div>
            </section>
            {/* Desserts section */}
            <section className="pt-12 pb-6 space-y-12">
                <Cover
                    img="/images/menu/category-desserts.jpg"
                    heading="DESSERTS"
                >
                    After a delightful meal, treat yourself to our handcrafted
                    desserts. From classic pastries to innovative sweet
                    creations, our dessert menu is curated to offer the perfect
                    end to your dining experience.
                </Cover>
                <div className="container mx-auto px-3 md:px-6 space-y-12">
                    <ShowMenus category="dessert" />
                    <div className="text-center">
                        <Link to="/shop">
                            <BtnWhite>ORDER YOUR FAVORITE FOOD</BtnWhite>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Pizza section */}
            <section className="pt-12 pb-6 space-y-12">
                <Cover img="/images/menu/category-pizza.jpg" heading="Pizza">
                    Experience the symphony of flavors with our artisanal
                    pizzas. Each slice is a testament to our passion for quality
                    ingredients and culinary excellence, ensuring a memorable
                    feast for all pizza enthusiasts.
                </Cover>
                <div className="container mx-auto px-3 md:px-6 space-y-12">
                    <ShowMenus category="pizza" />
                    <div className="text-center">
                        <Link to="/shop">
                            <BtnWhite>ORDER YOUR FAVORITE FOOD</BtnWhite>
                        </Link>
                    </div>
                </div>
            </section>
            {/* salad section */}
            <section className="pt-12 pb-6 space-y-12">
                <Cover img="/images/menu/categorty-salads.jpg" heading="salad">
                    Our salads are a celebration of freshness, featuring crisp
                    greens, colorful vegetables, and a burst of flavors that
                    come together to create a healthy, yet deliciously
                    satisfying meal option.
                </Cover>
                <div className="container mx-auto px-3 md:px-6 space-y-12">
                    <ShowMenus category="salad" />
                    <div className="text-center">
                        <Link to="/shop">
                            <BtnWhite>ORDER YOUR FAVORITE FOOD</BtnWhite>
                        </Link>
                    </div>
                </div>
            </section>
            {/* soup section */}
            <section className="pt-12 pb-6 space-y-12">
                <Cover img="/images/menu/category-soups.jpg" heading="soups">
                    Embrace the comfort of our soothing soups. Each bowl is a
                    hearty selection of the finest ingredients, slow-cooked to
                    perfection, offering warmth and nourishment with every
                    spoonful.
                </Cover>
                <div className="container mx-auto px-3 md:px-6 space-y-12">
                    <ShowMenus category="soup" />
                    <div className="text-center">
                        <Link to="/shop">
                            <BtnWhite>ORDER YOUR FAVORITE FOOD</BtnWhite>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Menu;
