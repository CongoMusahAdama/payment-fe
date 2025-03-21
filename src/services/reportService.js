import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports/';

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
