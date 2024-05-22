import React from 'react';
import './ProfileButtonSidebar.css'

function ProfileButtonSidebar(props) {
    const { profilePicture, username, isCollapsed, onOptionClick, selectedOption, option } = props;

    return (
        <button
            className={`ProfileButtonSidebar ${isCollapsed ? 'collapsed' : ''} ${selectedOption === option.name ? 'selected' : ''}`}
            onClick={() => onOptionClick(option.name)}
        >
            <img className={`ImageHero ${isCollapsed ? 'collapsed' : ''}`} src={profilePicture} alt='User Profile' />
            {!isCollapsed && (
                <span className='ProfileUsername'>{username}</span>
            )}
        </button>
    );
}

export { ProfileButtonSidebar };
