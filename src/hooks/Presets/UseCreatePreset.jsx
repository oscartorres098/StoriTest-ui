import { useState } from 'react';
import { CreatePresetFetch } from '../../api';

export const useCreatePeeset = ({}) => {
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (data, files) => {
      data.files = files
      console.log(data)
      try {
        setLoading(true);
        const response = await CreatePresetFetch(data);
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