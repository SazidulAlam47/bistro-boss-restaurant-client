import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Foods from "../../components/Foods/Foods";
import "./Shop.css";
import { useParams } from "react-router-dom";
import capitalize from "../../utils/capitalize";
import { useState } from "react";

const Shop = () => {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const { category: selectedCategory } = useParams();
    const selectedTab = categories.indexOf(selectedCategory);
    const [tabIndex, setTabIndex] = useState(
        selectedTab === -1 ? 0 : selectedTab
    );

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Shop</title>
            </Helmet>
            <section>
                <Cover img="/images/shop/banner2.jpg" heading="Shop" page>
                    Would you like to order a dish?
                </Cover>
            </section>

            <section className="container mx-auto px-3 md:px-6 py-12">
                <Tabs
                    defaultIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                >
                    <TabList>
                        {categories.map((category) => (
                            <Tab key={category}>{capitalize(category)}</Tab>
                        ))}
                    </TabList>

                    {categories.map((category) => (
                        <TabPanel key={category}>
                            <Foods category={category} />
                        </TabPanel>
                    ))}
                </Tabs>
            </section>
        </>
    );
};

export default Shop;
