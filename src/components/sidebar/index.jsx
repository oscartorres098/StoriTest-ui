import React, { useState, useContext, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { ListSidebar } from './ListSidebar';
import { ProfileButtonSidebar } from './ProfileButtonSidebar';
import './ListSidebar/ListSidebar.css'
import './Sidebar.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { GlobalContext } from '../../context/GlobalContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import menu from "../../assets/images/menu.png"

const MySwal = withReactContent(Swal);

function Sidebar(props) {

    let { mainOptions } = props;
    mainOptions = mainOptions.filter(option => option.show === true);

    const history = useHistory();
    const { activePage, setToken, setEmailGlobal, setIdUserGlobal, setUserName, showSupportBadge, setShowSupportBadge, showAdminBadge, setShowAdminBadge,  setActiveBlur} = useContext(GlobalContext);
    const [isCollapsed, setIsCollapsed] = useState(false);


    const handleOptionClick = (option) => {
            history.push(`/Admin/${option}`);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <React.Fragment>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className={`upper-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <ListSidebar
                        options={mainOptions}
                        selectedOption={activePage}
                        onOptionClick={handleOptionClick}
                        isCollapsed={isCollapsed}
                        showBadge={showAdminBadge}
                    />


                </div>
                <div className='lower-sidebar'>
                  
                </div>

                <div className='collapse-button-container' >
                    <button className='collapse-button' onClick={toggleSidebar} >
                       
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export { Sidebar };