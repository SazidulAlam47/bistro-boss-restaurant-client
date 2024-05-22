import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Make Payment</title>
            </Helmet>
            <SectionTitle heading="Payment" subHeading="Pay to eat" />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
};

export default Payment;
