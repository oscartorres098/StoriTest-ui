import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import './AllUsers.css'

function CuadroAllUsers(props) {

    const { cliente } = props;
    return (
        <div className='cuadroInfo sombra2' >
            <div className='name-container'>
                <div className="client-name">
                    <span>{cliente.name}</span>
                </div>
            </div>
            <div className='img-container'>
                <img className='imgUser' src={imgDefaultUser} alt="usuario" />
            </div>
            <div className='content-container'>
                <p><strong>Email: </strong> {cliente.email}<br/></p>
            </div>
        </div>
    )
}


export { CuadroAllUsers };