import { useState } from 'react';
import { SendEmailWelcomeFetch, SentFetch } from '../../api';

export const useSendWelcomeMail = ({}) => {
    const [loading, setLoading] = useState(false);
  
    const sendWelcomeEmail = async (data) => {
      
      try {
        setLoading(true);
        const response = await SendEmailWelcomeFetch(data);
        setLoading(false);
        return { response, loading };
      } catch (err) {
        return { data: null, error: err, loading: false, status: 500, message: '' };
      }
    };
    return {
      sendWelcomeEmail,
    };
}