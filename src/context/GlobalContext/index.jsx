import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

function PageProvider(props) {
    const [activePage, setActivePage] = useState(() => {
        // Initialize activePage from localStorage or set a default value
        const savedActivePage = localStorage.getItem('activePage');
        return savedActivePage || 'Home';
    });

    const [token, setToken] = useState();

    const [emailGlobal, setEmailGlobal] = useState(() => {
        // Initialize emailGlobal from localStorage or set a default value
        const savedEmailGlobal = localStorage.getItem('emailGlobal');
        return savedEmailGlobal || '';
    });

    const [idUserGlobal, setIdUserGlobal] = useState(() => {
        // Initialize idUserGlobal from localStorage or set a default value
        const savedIdUserGlobal = localStorage.getItem('idUserGlobal');
        return savedIdUserGlobal || '';
    });

    const [userName, setUserName] = useState(() => {
        // Initialize userName from localStorage or set a default value
        const savedUserName = localStorage.getItem('userName');
        return savedUserName || '';
    });

    const [userRole, setUserRole] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedUserRole = localStorage.getItem('userRole');
        return savedUserRole || '';
    });

    const [showBadge, setShowBadge] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedShowBadge = localStorage.getItem('showBadge');
        return Boolean(savedShowBadge) || true;
    });

    const [showNotificationsBadge, setShowNotificationsBadge] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedShowNotificationsBadge = localStorage.getItem('showNotificationsBadge');
        return Boolean(savedShowNotificationsBadge) || true;
    });

    const [showSupportBadge, setShowSupportBadge] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        return true;
    });

    const [showAdminBadge, setShowAdminBadge] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        return true;
    });

    const [selectedTaskId, setSelectedTaskId] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedSelectedTaskId = localStorage.getItem('selectedTaskId');
        return savedSelectedTaskId || '';
    });

    const [selectedUserId, setSelectedUserId] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedSelectedUserId = localStorage.getItem('selectedUserId');
        return savedSelectedUserId || '';
    });

    const [ownerName, setOwnerName] = useState(() => {
        // Initialize userRole from localStorage or set a default value
        const savedOwnerName = localStorage.getItem('ownerName');
        return savedOwnerName || '';
    });

    const [anchorEl, setAnchorEl] = useState(() => {
        // Initialize emailGlobal from localStorage or set a default value
        const savedAnchorEl = localStorage.getItem('anchorEl');
        return savedAnchorEl || false;
    });

    const [activeBlur, setActiveBlur] = useState(() => {
        // Initialize activeBlur from localStorage or set a default value
        const savedActiveBlur = localStorage.getItem('activeBlur');
        return savedActiveBlur || '';
    });

    const [activeBlurRegister, setActiveBlurRegister] = useState(() => {
        // Initialize activeBlurRegister from localStorage or set a default value
        const savedActiveBlurRegister = localStorage.getItem('activeBlurRegister');
        return savedActiveBlurRegister || '';
    });

    const [imgUsuario, setImgUsuario] = useState(() => {
        // Initialize imgUsuario from localStorage or set a default value
        const savedImgUsuario = localStorage.getItem('imgUsuario');
        return savedImgUsuario || '';
    });

    const [planesUsuario, setPlanesUsuario] = useState(() => {
        // Initialize imgUsuario from localStorage or set a default value
        const savedPlanesUsuario = [];
        // let arrayLocal = localStorage.getItem('planesUsuario').split(',');
        let arrayLocal = localStorage.getItem('planesUsuario');
        if (arrayLocal) {
            arrayLocal = arrayLocal.split(',');
            for(let i = 0; i<arrayLocal.length; i++){
                savedPlanesUsuario.push(arrayLocal[i]);
            }
        }
        return savedPlanesUsuario || [];
    });


        useEffect(() => {
            // Save state values to localStorage whenever they change
            localStorage.setItem('activePage', activePage);
            localStorage.setItem('emailGlobal', emailGlobal);
            localStorage.setItem('idUserGlobal', idUserGlobal);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('showBadge', showBadge);
            localStorage.setItem('showNotificationsBadge', showNotificationsBadge);
            localStorage.setItem('selectedTaskId', selectedTaskId);
            localStorage.setItem('selectedUserId', selectedUserId);
            localStorage.setItem('ownerName', ownerName);
            localStorage.setItem('anchorEl', anchorEl);
            localStorage.setItem('activeBlur', activeBlur);
            localStorage.setItem('activeBlurRegister', activeBlurRegister);
            localStorage.setItem('imgUsuario', imgUsuario);
            localStorage.setItem('planesUsuario', planesUsuario);

        }, [activePage, token, emailGlobal, idUserGlobal, userName, userRole, showBadge, showNotificationsBadge, selectedTaskId, selectedUserId, ownerName, activeBlur, activeBlurRegister, imgUsuario, planesUsuario]);

        return (
            <GlobalContext.Provider
                value={{
                    activePage,
                    setActivePage,
                    token,
                    setToken,
                    emailGlobal,
                    setEmailGlobal,
                    idUserGlobal,
                    setIdUserGlobal,
                    userName,
                    setUserName,
                    userRole,
                    setUserRole,
                    showBadge,
                    setShowBadge,
                    showNotificationsBadge,
                    setShowNotificationsBadge,
                    showSupportBadge,
                    setShowSupportBadge,
                    showAdminBadge,
                    setShowAdminBadge,
                    selectedTaskId,
                    setSelectedTaskId,
                    selectedUserId,
                    setSelectedUserId,
                    ownerName,
                    setOwnerName,
                    anchorEl,
                    setAnchorEl,
                    activeBlur,
                    setActiveBlur,
                    activeBlurRegister,
                    setActiveBlurRegister,
                    imgUsuario,
                    setImgUsuario,
                    planesUsuario,
                    setPlanesUsuario
                }}
            >
                {props.children}
            </GlobalContext.Provider>
        );
    }

export { GlobalContext, PageProvider };


