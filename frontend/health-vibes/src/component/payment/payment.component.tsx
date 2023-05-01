import "./payment.css";
import { useEffect, useState } from "react";
import PayPalButton from "../paypal/paypal.component";
import InputField from "../input-field/input.component";
import Link from "../link/link.component";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [href, setHref] = useState("#");
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [cvvInput, setCvvInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    if (
      cvvInput === "" ||
      nameInput === "" ||
      cardNumberInput === "" ||
      amountInput === ""
    ) {
      setHref("#");
    }
  }, [cvvInput, nameInput, cardNumberInput, amountInput]);

  const handleCardInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length > 16) {
      return;
    }
    setCardNumberInput(value);
    if (value.length === 16) {
      setHref("/successful");
    }
  };

  const handleCvvInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length > 3) {
      return;
    }
    setCvvInput(value);
    if (value.length === 3) {
      setHref("/successful");
    }
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setNameInput(value);
    let nameArr = value.split(" ");
    if (nameArr.length === 2 && cardNumberInput.length === 16) {
      setHref("/successful");
    }
  };

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setAmountInput(value);
    if (Number(value) === 0 || cardNumberInput.length < 16) {
      setHref("/failed");
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="payment-container">
      <form action="" method="post" className="payment-form">
        <label htmlFor="payment-method">Preferred payment method:</label>
        <select
          id="payment-method"
          name="payment-method"
          onChange={handleSelectChange}
          required
        >
          <option value="">Select a payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
        {(selectedOption === "credit-card" ||
          selectedOption === "debit-card") && (
          <div className="card-details">
            <label htmlFor="">Name on card:</label>
            <InputField
              type="text"
              name="cardName"
              id=""
              required
              value={nameInput}
              onChange={handleNameInput}
            />
            <label htmlFor="">Card number:</label>
            <InputField
              type="number"
              onChange={handleCardInput}
              name="cardNumber"
              id=""
              value={cardNumberInput}
            />
            <label htmlFor="">CVV/CVC:</label>
            <InputField
              type="number"
              name="cvv"
              id=""
              value={cvvInput}
              onChange={handleCvvInput}
            />
            <label htmlFor="">Amount:</label>
            <InputField
              type="number"
              name="amount"
              id=""
              required
              value={amountInput}
              onChange={handleAmountInput}
            />
            <Link
              type="submit"
              href={href}
              className="pay-btn"
              role="button"
              linkText="Pay"
            />
          </div>
        )}

        {selectedOption === "bank-transfer" && (
          <div>
            <p>Account number: 0047632198</p>
            <p>Account name: Health Vibes Inc</p>
            <p>Bank: Sterling Bank</p>
            <p>Account type: Current</p>
          </div>
        )}

        {selectedOption === "paypal" && (
          <div className="paypal-btn">
            <PayPalButton />
          </div>
        )}
      </form>
    </div>
  );
};
export default Payment;
