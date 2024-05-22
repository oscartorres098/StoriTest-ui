import { useState } from 'react';
import { CreateUserFetch } from '../../api';

export const useCreateUser = ({}) => {
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (data) => {
      
      try {
        setLoading(true);
        const response = await CreateUserFetch(data);
        setLoading(false);
        return { response, loading };
      } catch (err) {
        return { data: null, error: err, loading: false, status: 500, message: '' };
      }
    };
    return {
      onSubmit,
    };
}