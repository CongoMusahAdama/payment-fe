import axios from 'axios';

const API_URL = 'https://payment-be-3tc2.onrender.com/api/reports/';

const downloadTransactionReport = async (format, filters) => {
    const response = await axios.get(`${API_URL}download`, {
        params: { format, ...filters },
        responseType: 'blob', // To handle file download
    });
    return response.data;
};

const reportService = {
    downloadTransactionReport,
};

export default reportService;
