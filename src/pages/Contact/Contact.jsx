import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import OurLocation from "./OurLocation";
import ContactForm from "./ContactForm";

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Contact Us</title>
            </Helmet>
            <Cover img="/images/contact/banner.jpg" heading="Contact Us" page>
                Get in Touch, We&apos;re Here to Help
            </Cover>
            <OurLocation />
            <ContactForm />
        </>
    );
};

export default Contact;
