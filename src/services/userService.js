import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}profile`);
    return response.data;
};

const updateUserProfile = async (profileData) => {
    const response = await axios.put(`${API_URL}profile`, profileData);
    return response.data;
};

const userService = {
    getUserProfile,
    updateUserProfile,
};

export default userService;
