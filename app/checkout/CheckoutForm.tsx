'use client';
import { useCart } from "@/hooks/useCart";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { formatPrice } from "@/utils/formatPrice";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm = ({ clientSecret, handleSetPaymentSuccess }: CheckoutFormProps) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return toast.error("Stripe is not ready yet");
    if (isLoading) return; // 🔹 prevent double submission
    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else {
        toast.success("Checkout Success");
        handleClearCart();
        handleSetPaymentSuccess(true);
        handleSetPaymentIntent(null);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>

      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement options={{ mode: "shipping", allowedCountries: ["US", "KE"] }} />

      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <div className="py-4 text-center text-slate-700 text-xl font-bold">Total: {formattedPrice}</div>

      <Button
        type="submit"
        label={isLoading ? "Processing..." : "Pay now"}
        disabled={isLoading || !stripe || !elements}
      />
    </form>
  );
};

export default CheckoutForm;
