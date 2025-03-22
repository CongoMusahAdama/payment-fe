export type ProfileTypes = {
  Fullname: string;
  email: string;
  phone: string;
  address: string;
  _id?: string;
  // role: "user" | "admin"; // Add more roles if needed
  createdAt: string;
  updatedAt: string;
  moneyRequests: MoneyRequest[];
  payments: Payment[];
  transactions: Transaction[];
};

export type MoneyRequest = {
  // Add money request properties as needed
};

export type Payment = {
  // Add payment properties as needed
};

export type Transaction = {
  // Add transaction properties as needed
};

export type UserResponse = {
  user: ProfileTypes;
};

export interface TokenResponse {
  token: string;
  refreshToken: string;
}
