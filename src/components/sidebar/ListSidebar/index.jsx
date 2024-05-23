import React from 'react';
import { ButtonSidebar } from '../ButtonSidebar';
import '../ButtonSidebar/ButtonSidebar.css';
import Badge from '@mui/material/Badge';


function ListSidebar(props) {

    const { selectedOption, isCollapsed, showBadge } = props;

    return (
        <ul className={`${props.className} list-style`}>
            {props.options.map((option) => (
                <li key={option.name}>
                    {(option.name === "Support" || option.name === "Messages Admin")? 
                        <Badge variant="dot" invisible={showBadge} color="primary">
                        <ButtonSidebar
                            className={`ButtonSidebar ${isCollapsed ? 'collapsed' : ''} ${selectedOption === option.name ? 'selected' : ''}`
                            }
                            onClick={() => props.onOptionClick(option.name)}
                            selected={props.selectedOption === option.name}
                            icon={option.icon}
                            children={!isCollapsed && option.name}
                        >
                        </ButtonSidebar>
                        </Badge>
                        : <ButtonSidebar
                            className={`ButtonSidebar ${isCollapsed ? 'collapsed' : ''} ${selectedOption === option.name ? 'selected' : ''}`
                            }
                            onClick={() => props.onOptionClick(option.name)}
                            selected={props.selectedOption === option.name}
                            icon={option.icon}
                            children={!isCollapsed && option.name}
                        >
                        </ButtonSidebar>
                    }
                </li>
            ))}
        </ul>
    );
}

export { ListSidebar };
