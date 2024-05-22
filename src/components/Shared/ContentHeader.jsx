import React from 'react';
import './SharedStyles.css';

function ContentHeader(props) {

    const { text } = props;

    return (
        <React.Fragment>
            <h1 className='ContentHeader' style={{color:'#004752', fontWeight:'normal'}}>
                {text}
            </h1>
        </React.Fragment>
    );
}


export { ContentHeader };

