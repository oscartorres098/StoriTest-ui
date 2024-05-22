import React, { forwardRef } from "react";

const InputBar = forwardRef((props, ref) => {
    const { type, className, placeholder } = props;

    return (
        <input type={type}
            className={className}
            placeholder={placeholder}
        />
    );
});

export { InputBar };
