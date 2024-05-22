import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import './AllPresets.css'

function CuadroAllPresets(props) {

    const { cliente } = props;
    return (
        <div className='cuadroInfo sombra2' style={{background: cliente.bgColor}}>
            <div className='name-container'>
                <div className="client-name">
                    <span>{cliente.nombre}</span>
                </div>
            </div>
            <div className='img-container'>
                <img className='imgUser' src={imgDefaultUser} alt="usuario" />
            </div>
            <div>
                <p><strong>Company: </strong> {cliente.company}<br/>
                <strong>Phone: </strong> {cliente.telefono}<br/>
                <strong>Email: </strong> {cliente.correo}</p>
            </div>
        </div>
    )
}


export { CuadroAllPresets };