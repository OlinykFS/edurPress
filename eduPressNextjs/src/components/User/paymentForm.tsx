"use client";
import { useState } from "react";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(" ").slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };


  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, ""); 
    setCvv(cleaned.slice(0, 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber" className="block font-medium text-gray-700 text-sm">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          className="p-2 border rounded w-full"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
      </div>
      <div>
        <label htmlFor="expiryDate" className="block font-medium text-gray-700 text-sm">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          placeholder="MM/YY"
          className="p-2 border rounded w-full"
          value={expiryDate}
          onChange={handleExpiryDateChange}
        />
      </div>
      <div>
        <label htmlFor="cvv" className="block font-medium text-gray-700 text-sm">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          placeholder="123"
          className="p-2 border rounded w-full"
          value={cvv}
          onChange={handleCvvChange}
        />
      </div>
      <button
        type="submit"
        className="bg-[#FF782D] hover:bg-[#FF682D] py-3 rounded w-full text-white"
      >
        Pay Now
      </button>
    </form>
  );
}