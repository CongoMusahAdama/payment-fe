import React, { FormEvent, useState } from "react";
import transactionService from "../../services/transactionService";

const PAYSTACK_PUBLIC_KEY = "pk_test_54d0afa0a28d96055f4f4b26e05d11e4877f14e5";

const Transfer = () => {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const paymentData = {
        email: recipientId,
        amount: Number(amount) * 100, // Convert to kobo
        publicKey: PAYSTACK_PUBLIC_KEY,
      };
      const response = await transactionService.initiatePayment(paymentData);
      // Redirect to Paystack authorization URL
      window.location.href = response.authorization_url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Money Transfer</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleTransfer} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? "Processing..." : "Transfer"}
        </button>
      </form>
    </div>
  );
};

export default Transfer;
