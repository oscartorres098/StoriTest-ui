import axios from 'axios';

export const CreateUserFetch = async (data) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.post(`${API_BASE_URL}user`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};