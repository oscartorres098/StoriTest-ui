import React from 'react';

function ButtonSidebar(props) {

    const { className, onClick, children, icon } = props;

    return (
        <button
            className={className}
            onClick={onClick}
        >
            {icon && <div className='ButtonIcon'>{icon}</div>}
            {children && <div className='ButtonText'>{children}</div>}
        </button>
    );
}

export { ButtonSidebar };
