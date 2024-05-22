import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineSearch } from 'react-icons/ai';
import './SharedStyles.css';

function SearchComponent(props) {
    const { search, searcher } = props;
    return <React.Fragment>
        <OutlinedInput 
            endAdornment={
                <InputAdornment position="start">
                    <AiOutlineSearch />
                </InputAdornment>
                } 
            className="inputSearchComponent" 
            type="text" 
            placeholder="Search" 
            value={search} 
            onChange={searcher}
        />
    </React.Fragment>
}

export {SearchComponent};