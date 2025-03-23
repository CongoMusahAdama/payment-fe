import axios from 'axios';

const API_URL = 'https://payment-be-3tc2.onrender.com/api/auth/';


const register = async (userData) => {
    console.log("Registering user with data:", userData);

    try {
        const response = await axios.post(`${API_URL}register`, userData);
        return response.data;
    } catch (error) {
        console.error("Register error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const login = async (userData) => {
    console.log("Logging in user with data:", userData);

    try {
        const response = await axios.post(`${API_URL}login`, userData);
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const logout = async () => {
    console.log("Logging out user");

    try {
        await axios.post(`${API_URL}logout`);
    } catch (error) {
        console.error("Logout error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const refreshToken = async (token) => {
    console.log("Refreshing token:", token);

    try {
        const response = await axios.post(`${API_URL}refresh-token`, { refreshToken: token });
        return response.data;
    } catch (error) {
        console.error("Refresh token error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const mfaSetup = async (email) => {
    console.log("Setting up MFA for email:", email);

    try {
        const response = await axios.post(`${API_URL}mfa-setup`, { email });
        return response.data;
    } catch (error) {
        console.error("MFA setup error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const mfaVerify = async (email, code) => {
    console.log("Verifying MFA for email:", email, "with code:", code);

    try {
        const response = await axios.post(`${API_URL}mfa-verify`, { email, code });
        return response.data;
    } catch (error) {
        console.error("MFA verify error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

const authService = {
    register,
    login,
    logout,
    refreshToken,
    mfaSetup,
    mfaVerify
};

export default authService;
