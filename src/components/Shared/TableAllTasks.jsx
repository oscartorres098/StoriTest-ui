import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../context/GlobalContext';
import { PopupInfoTask } from './tasks/PopupInfoTask';
import ApiMiddleware from "./ApiMiddleware";
import { Popup } from './Popup';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';
import './SharedStyles.css'

function TableAllTasks(props) {
    const { data } = props;
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
    const { setToken, token, setEmailGlobal, setIdUserGlobal, setUserName, userRole, setActiveBlur } = useContext(GlobalContext)

    const [dataTasks, setDataTasks] = useState(props.data);
    const [selectedTask, setSelectedTask] = useState();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [allAssistants, setAllAssistant] = useState();

    useEffect(() => {
        setDataTasks(props.data);
    }, [props.data])

    const history = useHistory();

    const consumeFetch = async (url, options) => {
        try {
            const originalFetch = fetch;
            const fetchWithMiddleware = ApiMiddleware(originalFetch);
            const { response, token } = await fetchWithMiddleware(url, options);
            // Se detecta token nuevo
            if (token) {
                setToken(token)
            }
            return await response;
        } catch (error) {
            if (error.message === "RefreshToken Vencido") {
                console.log(error.message, error)
                setToken("");
                setEmailGlobal("");
                setIdUserGlobal("");
                setUserName("");
                history.push('/');
            }
        }

    }

    useEffect(() => {

        async function fetchData() {
            const url = `${API_BASE_URL}/users/usersByRole/Assistant`
            const response = await consumeFetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });

            if (!response.ok) {
                throw new Error(response);
            }

            const assistants = await response.json();

            setAllAssistant(assistants);

        }

        fetchData();

    }, [])

    const handleRowClick = ((rowData) => {
        if (userRole.toUpperCase() === 'Admin'.toUpperCase()) {
            setSelectedTask(rowData);
            setIsPopupOpen(true);
            setActiveBlur(true);
        }
    })

    const handleUpdateTask = async (task) => {
        let tempData = [...dataTasks];
        tempData[tempData.indexOf(selectedTask)] = task;
        setDataTasks(tempData);
        setSelectedTask(task);
    }

    function closePopup() {
        setIsPopupOpen(false);
        setActiveBlur(false);
    }

    const capitalizeFirstLetter = (text) => {
        if (text.length === 0) return ''; 
        const firstLetter = text[0].toUpperCase();
        const restOfString = text.slice(1);
        return firstLetter + restOfString;
      };

    return <React.Fragment>
        <Popup isOpen={isPopupOpen} onClose={closePopup} modalClass="popup-info-task">
            {selectedTask && (
                <PopupInfoTask
                    selectedTask={selectedTask}
                    assistants={allAssistants}
                    onUpdateTask={handleUpdateTask}
                />
            )}
        </Popup>
        <div className="table-tasks">
            <TableContainer>
                <Table>
                    <TableHead className="tasks-summary-head">
                        <TableRow>
                            <TableCell className="task-summary-headers">Title</TableCell>
                            <TableCell className="task-summary-headers">Description</TableCell>
                            <TableCell className="task-summary-headers">Status</TableCell>
                            <TableCell className="task-summary-headers">Created By</TableCell>
                            <TableCell className="task-summary-headers">Assistant</TableCell>
                            <TableCell className="task-summary-headers">Calification</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tasks-summary-body">
                        {dataTasks.map((row) => {
                            var titulo = capitalizeFirstLetter(row.taskTitle);
                            var descripcion = capitalizeFirstLetter(row.description)
                            row.taskTitle = titulo;
                            row.description = descripcion;
                            return (
                            <TableRow className={`task-summary-row ${userRole.toUpperCase() === 'Admin'.toUpperCase() ? 'pointer' : ''}`} onClick={() => handleRowClick(row)} key={row.id}>
                                <TableCell>{titulo ? titulo : ''}</TableCell>
                                <TableCell>{descripcion ? descripcion : ''}</TableCell>
                                <TableCell>{row.status_Id && row.status_Id.status_name ? row.status_Id.status_name : ''}</TableCell>
                                <TableCell>{row.clientId.name ? row.clientId.name : ''}</TableCell>
                                <TableCell>{row.assistantId && row.assistantId.name ? row.assistantId.name : ''}</TableCell>
                                <TableCell>{row.calification ? row.calification : ''}</TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </React.Fragment>
}

export { TableAllTasks };