import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './paypal.css'

const PayPalButton = () => {
  const [isPaid, setIsPaid] = useState(false);

  const handlePaymentSuccess = (details: any) => {
    setIsPaid(true);
    console.log("Payment completed successfully:", details);
  };

  useEffect(() => {
    setIsPaid(false);
  }, []);

  return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZe35W1XdaoEMBJaVqRcijb3dVN7m5XRyRClN3B1X1Zmvw9FNIouDP4g1eJ32O94mS8ddN5OYnYpPljx",
        }}
      >
        <PayPalButtons
        className="paypal"
          createOrder={(data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00",
                  },
                },
              ],
            });
          }}
          onApprove={(data: any, actions: any) => {
            return actions.order.capture().then(handlePaymentSuccess);
          }}
        />
      </PayPalScriptProvider>
  );
};

export default PayPalButton;
