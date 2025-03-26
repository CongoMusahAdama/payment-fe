export type TransactionHistoryTypes = {
  _id: string;
  amount: number;
  createdAt: string;
  status: "completed" | string;
  reference: string;
  transactionType: "deposit" | "transfer" | "withdrawal";
};

export type DepositFundsTypes = {
  amount: number;
  email: string;
};

export type SendFundsTypes = {
  amount: number;
  sendersId: string;
  recipientId: string;
};

export type PaymentDetailsTypes = {
  _id: string;
  amount: number;
  createdAt: string;
  user: string;
  reference: string;
  status: string;
};

export type WithdrawFundsTypes = {
  amount: number;
  id: string;
  // otp: string;
};

export type RequestFundsTypes = {
  amount: number;
  recipientId: string;
  requesterId: string;
  note: string;
};
