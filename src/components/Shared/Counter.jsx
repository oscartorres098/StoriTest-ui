import React from 'react';

function Counter(props) {
        const { count, counterClassName } = props;

        return (
            <React.Fragment>
                    <h1 className={counterClassName}>{count}</h1>
            </React.Fragment>
        );
}

export { Counter };
