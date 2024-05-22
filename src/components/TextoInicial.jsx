import React from 'react';
import { Link } from 'react-router-dom';
import imagenLogin from '../assets/images/logos/logo-assisttu-petroleum.png'

export const TextLogin = () => {
  return (
    <>
      <div style={{}} className="text contentChild">
        <img style={{height:'100px', marginTop:'100px'}} src={imagenLogin}></img>
          <b style={{fontWeight:'700', fontSize:'60px', lineHeight:'20px', top:'40px'}} className="text-1">
            <p className="if-you-dont-have-an-account">Sign In to</p>
            <p className="assittu">Assittu</p>
          </b>
          <div style={{fontWeight:'400', fontSize:'23px'}} className="text-2">
            <p className="if-you-dont-have-an-account">
              <span>{`if you don’t have  an`}</span><br />
              <span>account you can </span>
            </p>
            <Link style={{textDecoration:'none'}} to='/register'>
              <p style={{color:'#FF5C34'}} className="register-here">
                <span>Register here!</span>
              </p>
            </Link>
          </div>
      </div>
    </>
  )
}
