import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getProfile = async () => {
    const response = await axios.get(`${API_URL}profile`);
    return response.data;
};

const updateProfile = async (profileData) => {
    const response = await axios.put(`${API_URL}profile`, profileData);
    return response.data;
};

const uploadKYC = async (formData) => {
    const response = await axios.post(`${API_URL}upload-kyc`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const profileService = {
    getProfile,
    updateProfile,
    uploadKYC,
};

export default profileService;
