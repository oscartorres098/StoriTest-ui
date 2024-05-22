import React from 'react';

function BtnSelect(props) {

    const { divClassName, type, buttonClassName, childrenClassName, onClick, children, image, imgClassName, imageAlt, iconClassName, icon } = props;

    return (
        <React.Fragment>
            <div className={divClassName}>
                <button
                    type={type || "button"}
                    className={buttonClassName}
                    onClick={onClick}
                >
                    {image && <img className={imgClassName} src={image} alt={imageAlt} />}
                    {icon && <div className={iconClassName}>{icon}</div>}
                </button>
                {children && <div className={childrenClassName}>{children}</div>}
            </div>

        </React.Fragment>
    );
}

export { BtnSelect };
