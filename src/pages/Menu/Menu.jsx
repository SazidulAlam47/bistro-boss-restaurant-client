import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import MenuSection from "./MenuSection";

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
            {/* offered section */}
            <MenuSection
                heading="TODAY'S OFFER"
                subHeading="Don't miss"
                category="offered"
            />
            {/* Desserts section */}
            <MenuSection
                heading="Desserts"
                img="/images/menu/category-desserts.jpg"
                category="dessert"
                cover
            >
                After a delightful meal, treat yourself to our handcrafted
                desserts. From classic pastries to innovative sweet creations,
                our dessert menu is curated to offer the perfect end to your
                dining experience.
            </MenuSection>
            {/* Pizza section */}
            <MenuSection
                heading="Pizza"
                img="/images/menu/category-pizza.jpg"
                category="pizza"
                cover
            >
                Experience the symphony of flavors with our artisanal pizzas.
                Each slice is a testament to our passion for quality ingredients
                and culinary excellence, ensuring a memorable feast for all
                pizza enthusiasts.
            </MenuSection>
            {/* salad section */}
            <MenuSection
                heading="salad"
                img="/images/menu/category-salads.jpg"
                category="salad"
                cover
            >
                Our salads are a celebration of freshness, featuring crisp
                greens, colorful vegetables, and a burst of flavors that come
                together to create a healthy, yet deliciously satisfying meal
                option.
            </MenuSection>

            {/* soup section */}
            <MenuSection
                heading="soups"
                img="/images/menu/category-soups.jpg"
                category="soup"
                cover
            >
                Embrace the comfort of our soothing soups. Each bowl is a hearty
                selection of the finest ingredients, slow-cooked to perfection,
                offering warmth and nourishment with every spoonful.
            </MenuSection>
        </div>
    );
};

export default Menu;
