import React from 'react';

function Button(props) {

    const { type, buttonClassName, iconClassName, childrenClassName, onClick, children, icon, rightIcon, image, imgClassName, imageAlt, imageSide, three, inactive } = props;

    return (
        <button
            type={type || "button"}
            className={buttonClassName}
            onClick={onClick}
            disabled={inactive ? true:false}
        >
            {three && imageSide.toLowerCase() === "right" && <div className='three-div' style={{width:"39px"}}></div>}
            {image && imageSide && imageSide.toLowerCase() === "left" && <img className={imgClassName} src={image} alt={imageAlt}/>}
            {icon && !rightIcon && <div className={iconClassName}>{icon}</div>}
            {children && <div className={childrenClassName}>{children}</div>}
            {icon && rightIcon && <div className={iconClassName}>{icon}</div>}
            {image && imageSide && imageSide.toLowerCase() === "right" && <img className={imgClassName} src={image} alt={imageAlt}/>}
            {three && imageSide.toLowerCase() === "left" && <div className='three-div' style={{width:"39px"}}></div>}
        </button>
    );
}

export { Button };
