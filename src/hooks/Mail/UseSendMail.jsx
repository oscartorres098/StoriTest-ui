import { useState } from 'react';
import { SendEmailFetch } from '../../api';

export const useSendMail = ({}) => {
    const [loading, setLoading] = useState(false);
  
    const sendEmail = async (data) => {
      console.log(data)
      try {
        setLoading(true);
        const response = await SendEmailFetch(data);
        setLoading(false);
        return { response, loading };
      } catch (err) {
        return { data: null, error: err, loading: false, status: 500, message: '' };
      }
    };
    return {
      sendEmail,
    };
}