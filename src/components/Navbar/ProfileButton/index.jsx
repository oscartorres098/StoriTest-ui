import React from 'react';
import './ProfileButtonSidebar.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ProfileButton(props) {
    const { profilePicture } = props;

    return (
        <Link to="/user/Profile">
            <img className='ImageHero' alt='User Profile' src={profilePicture} />
            </Link>
    );
}

export { ProfileButton };
