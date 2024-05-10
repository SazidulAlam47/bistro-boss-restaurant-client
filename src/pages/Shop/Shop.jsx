import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Orders from "../../components/Orders/Orders";
import "./Shop.css";
import { useParams } from "react-router-dom";

const Shop = () => {
    const { category } = useParams();
    console.log(category);
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
                <Tabs>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    <TabPanel>
                        <Orders category="salad" />
                    </TabPanel>
                    <TabPanel>
                        <Orders category="pizza" />
                    </TabPanel>
                    <TabPanel>
                        <Orders category="soup" />
                    </TabPanel>
                    <TabPanel>
                        <Orders category="dessert" />
                    </TabPanel>
                    <TabPanel>
                        <Orders category="drinks" />
                    </TabPanel>
                </Tabs>
            </section>
        </>
    );
};

export default Shop;
