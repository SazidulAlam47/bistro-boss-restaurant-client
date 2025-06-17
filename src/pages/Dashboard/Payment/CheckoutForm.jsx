import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { totalPrice, carts, refetch } = useCarts();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure
                .post("/payments/create-payment-intent", { price: totalPrice })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    console.log(clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[payment error]", error);
            setError(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        //confirm the payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName || "anonymous",
                        email: user.email || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log("Confirm Error:", confirmError);
        } else {
            console.log("Payment intent:", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                Swal.fire({
                    icon: "success",
                    title: "Order Confirmed!",
                    text: `Your transition id : ${paymentIntent.id}`,
                });
                // save the payment to database
                const payment = {
                    tnxId: paymentIntent.id,
                    price: parseFloat(totalPrice),
                    email: user.email,
                    name: user.displayName,
                    date: new Date(),
                    cartIds: carts.map((item) => item._id),
                    menuItemIds: carts.map((item) => item.foodId),
                    status: "pending",
                };
                const paymentRes = await axiosSecure.post("/payments", payment);
                console.log(paymentRes.data);
                if (paymentRes?.data?.insertedId) {
                    // Clear the cart after successful payment
                    await axiosSecure.delete(`/carts?email=${user.email}`);
                    refetch();
                    navigate("/dashboard/payment-history");
                }
            }
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 justify-center items-center h-[60vh]"
        >
            <CardElement
                className="w-1/2 mx-auto bg-[#F3F3F3] p-3"
                options={{
                    style: {
                        base: {
                            fontSize: "17px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#999",
                            },
                        },
                        invalid: {
                            color: "#ef4444",
                        },
                    },
                }}
            />
            <button
                className="btn text-xl text-white bg-[#D1A054] hover:bg-[#e9af59] px-5"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
