import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    return (
        <>
            <SectionTitle heading="Payment" subHeading="Pay to eat" />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
};

export default Payment;
