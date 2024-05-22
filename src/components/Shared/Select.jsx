import React, {forwardRef} from 'react';

const Select = forwardRef((props, ref) => {
    const { className, options, value, handleOnChange } = props;

    return (
        <select className={className} ref={ref} value={value} onChange={handleOnChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

export { Select };
