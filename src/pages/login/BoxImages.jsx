import React from 'react'
import imgLogin from '../../assets/images/img-login-boxes.png';


function BoxImages() {
    return <React.Fragment>
        <div className="login-section-images">
            <img className='img-login'
                src={imgLogin}
                alt='Assisttu Login' >
            </img>
        </div>
    </React.Fragment>
}

export { BoxImages };