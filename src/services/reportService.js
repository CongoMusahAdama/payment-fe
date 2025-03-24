import axios from "axios";

const API_URL = "http://localhost:5000/api/reports/";

const downloadTransactionReport = async (token, format, filters) => {
  const response = await axios.get(`${API_URL}download`, {
    params: { format, ...filters },
    responseType: "blob", // To handle file download
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const reportService = {
  downloadTransactionReport,
};

export default reportService;
