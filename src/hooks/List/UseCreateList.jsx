import { useState } from 'react';
import { CreateListFetch } from '../../api';

export const useCreateList = ({}) => {
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (data, users) => {
      console.log(users)
      const usersId=users.map((user)=>{
        return user.id
      })
      data.mails = usersId
      console.log(data)
      try {
        setLoading(true);
        const response = await CreateListFetch(data);
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