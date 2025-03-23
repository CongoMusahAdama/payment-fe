import React, { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";
import { TransactionHistoryTypes } from "../../utils/types/transaction";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionHistoryTypes[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getTransactionHistory();
        console.log(data);

        setTransactions(data.transactions);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Transaction History</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="bg-white p-6 rounded shadow-md w-80">
        {transactions.length === 0 && <p className="text-gray-500">No transactions available.</p>}

        {transactions.map((transaction) => (
          <li key={transaction.id} className="border-b p-2">
            {transaction.amount} - {transaction.date} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
