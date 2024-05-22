import React from 'react';

function Header(props) {
    const { headerClassName, level, children } = props;
    const HeaderElement = `h${level}`;

    return (
        <HeaderElement className={headerClassName}>
            {children}
        </HeaderElement>
    );
}

export { Header };

