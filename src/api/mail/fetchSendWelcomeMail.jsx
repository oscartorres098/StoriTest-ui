import axios from 'axios';

export const SendEmailWelcomeFetch = async (data) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.post(`${API_BASE_URL}mail/welcome`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};