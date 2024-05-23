import { useState } from 'react';
import axios from 'axios';

export const useGetList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getList = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}list`);
      setData(response.data);
    } catch (err) {
      console.log(err)
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { getList, loading, data, error };
};
