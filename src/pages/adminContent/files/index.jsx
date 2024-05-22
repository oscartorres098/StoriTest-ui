import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({onData}) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const newFiles = await Promise.all(
      Array.from(selectedFiles).map(file => convertToBase64(file))
    );
    setFiles([...files, ...newFiles]);
    console.log(files)
    onData(files);
  };


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ name: file.name, base64: reader.result });
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-button">
        Upload File
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
      </label>
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index} className="file-item">
            <p className="file-name">{file.name}</p>
            <img
              src={file.base64}
              alt={file.name}
              className="file-preview"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;