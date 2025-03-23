import { URL } from "@/utils/constant";
import axios from "axios";

// const API_URL = 'http://localhost:5000/api/transactions/';
const API_URL = `${URL}/transactions/`;

const depositFunds = async (depositData) => {
  const response = await axios.post(`${API_URL}deposit`, depositData);
  return response.data;
};

const requestMoney = async (requestData) => {
  const response = await axios.post(`${API_URL}request-money`, requestData);
  return response.data;
};

const getTransactionHistory = async (token, filters) => {
  const response = await axios.get(`${API_URL}history`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const transactionService = {
  depositFunds,
  requestMoney,
  getTransactionHistory,
};

export default transactionService;
