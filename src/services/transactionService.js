import axios from 'axios';

const API_URL = 'https://payment-be-3tc2.onrender.com/api/transactions/';

const depositFunds = async (depositData) => {
    const response = await axios.post(`${API_URL}deposit`, depositData);
    return response.data;
};


const requestMoney = async (requestData) => {
    const response = await axios.post(`${API_URL}request-money`, requestData);
    return response.data;
};

const getTransactionHistory = async (filters) => {
    const response = await axios.get(`${API_URL}history`, { params: filters });
    return response.data;
};

const transactionService = {
    depositFunds,
    requestMoney,
    getTransactionHistory,
};


export default transactionService;
