import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuLogin = () => {
  return (
    <>
      <div className="menuLogin textRegular">
          <NavLink className='textSignin' activeClassName='active' exact to='/'>
            <div>
                <span className="menuSignin">Sign in</span>
            </div>
          </NavLink>
          <NavLink className='textRegister' activeClassName='active' exact to='/register'>
            <div>
                  <span className="menuRegister">Register</span>
            </div>
          </NavLink>
      </div>
    </>
  )
}
