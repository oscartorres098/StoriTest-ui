import React from 'react';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { CuadroAllUsers } from './dashboardBox';
import { useEffect } from 'react';
import { useGetUser } from "../../../hooks";
function Dashboard() {
    const { getUsers, loading, data, error } = useGetUser();

    useEffect(() => {
        console.log('asds')
        getUsers();
    }, []);
    return (
        <>
            <div className="assistant-header" >
                <ContentHeader text="Dashboard" />
            </div>
            <div className='profile' style={{ display: 'flex', gap: '20px', rowGap: '40px', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', padding: '20px' }} >

                <CuadroAllUsers
                    cliente={{ name: 'Email Sended: 3' }}

                />

                <CuadroAllUsers
                    cliente={{ name: 'Users: 1' }}

                />

                <CuadroAllUsers
                    cliente={{ name: 'Canceled Suscriptios: 1' }}

                />

            </div>
        </>
    );
}

export { Dashboard };
