import React from 'react';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="font-bold">{transaction.title}</h2>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {transaction.date}</p>
      <p>Status: {transaction.status}</p>
    </div>
  );
};

export default TransactionCard;
