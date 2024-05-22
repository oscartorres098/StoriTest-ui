import React from 'react';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { CuadroAllUsers } from './CuadroAllUsers';
import { useEffect } from 'react';
import { useGetUser } from "../../../hooks";
function AllUsers() {
  const { getUsers, loading, data, error } = useGetUser();

  useEffect(() => {
    getUsers();
  }, []); 
    return (
        <>
          <div className="assistant-header" >
                <ContentHeader text="Clients" />
          </div>
          <div className='profile' style={{display:'flex', gap:'20px',rowGap:'40px' ,flexWrap: 'wrap', justifyContent:'flex-start',alignItems:'center', alignContent:'center', padding:'20px' }} >
            {data && data.map(
                option => 
                <div key={option.name}>
                <CuadroAllUsers
                cliente = {option}

                /></div>
            )}
          </div>
        </>
    );
}

export { AllUsers };
