import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import './Dashboard.css'

function CuadroAllUsers(props) {

    const { cliente } = props;
    return (
        <div className='cuadroInfoDashboard sombra2' >
            <div className='name-container'>
                <div className="client-name">
                    <span>{cliente.name}</span>
                </div>
            </div>
            
        </div>
    )
}


export { CuadroAllUsers };