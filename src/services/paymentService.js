import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments/';

const initiatePayment = async (paymentData) => {
    const response = await axios.post(`${API_URL}initiate`, paymentData);
    return response.data;
};

const verifyPayment = async (reference) => {
    const response = await axios.get(`${API_URL}verify/${reference}`);
    return response.data;
};

const initiateWithdrawal = async (user, recipientCode, amount) => {
    const response = await axios.post(`${API_URL}withdraw`, { recipientCode, amount });
    return response.data;
};

const initiateDeposit = async (paymentData) => {
    const response = await axios.post(`${API_URL}deposit`, paymentData);
    return response.data;
};

const paymentService = {
    initiatePayment,
    verifyPayment,
    initiateDeposit,
    initiateWithdrawal
};



export default paymentService;
