import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import './AllPresets.css'

function CuadroAllPresets(props) {

    const { cliente } = props;
    return (
        <div className='cuadroInfo sombra2' >
            <div className='name-container'>
                <div className="client-name">
                    <span>{cliente.subject}</span>
                </div>
            </div>
            <div className='img-container'>
                <img className='imgUser' src={imgDefaultUser} alt="usuario" />
            </div>
            <div className='content-container'>
                <p><strong>Body: </strong> {cliente.body}<br/></p>
                <p><strong>Title: </strong> {cliente.title}<br/></p>

            </div>
        </div>
    )
}


export { CuadroAllPresets };