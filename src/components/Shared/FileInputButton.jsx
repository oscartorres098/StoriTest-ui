import React, { useState, useContext } from 'react';
import './FileInputButton.css';
import { GlobalContext } from '../../context/GlobalContext';



const FileInputButton = ({ buttonClassName, icon, iconClassName, token, consumeFetch, fetchData, task_id, sender, receiver, chatKind, user1Id, user2Id}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1"; 
    const { idUserGlobal  } = useContext(GlobalContext);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(chatKind)

        setSelectedFile(file);
        if (file) {
            const formData = new FormData();
            if (chatKind == 'Client') {
                formData.append("upload_file", file);
                formData.append("task_id", task_id);
                formData.append("sender", sender);
                formData.append("receiver", receiver);
                formData.append("text", file.name);
            }else{
                console.log(receiver)
                formData.append("upload_file", file);
                formData.append("sender", sender);
                formData.append("receiver", idUserGlobal == user1Id ? user2Id : user1Id);
                formData.append("text", file.name);
            }

            event.preventDefault();
            let url_put = chatKind == 'Client' ? `${API_BASE_URL}/messages/` : chatKind == 'Admin' ? `${API_BASE_URL}/admin_chat/` : `${API_BASE_URL}/support_chat/`;

            consumeFetch(url_put, {
                method: "POST",
                headers: {
                    Authorization: `${token}`
                },
                body: formData,
            }).then((res) => {
                if (res.ok) {
                    fetchData();
                } else {
                    console.log("No fue posible registrar el mensaje");
                }
            }).catch((err) => {
                console.log(err);
            });
        };
    };

    return (
        <>
            <label className={buttonClassName} htmlFor="file-input">
                {icon && <div className={iconClassName}>{icon}</div>}
            </label>
            <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </>

    );
};

export default FileInputButton;