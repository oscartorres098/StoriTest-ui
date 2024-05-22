import React from 'react';
import imagenLogin from '../assets/images/women-assistance.jpg'

export const ImagenLogin = () => {
  return (
    <>
      <div className='contentChild' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img style={{width:'350px', marginBottom:'5rem'}} src={imagenLogin}></img>
      </div>
    </>
  )
}
