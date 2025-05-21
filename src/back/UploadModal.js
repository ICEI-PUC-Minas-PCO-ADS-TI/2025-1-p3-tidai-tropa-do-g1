import React, { useState } from "react";
import "../styles/UploadModal.css";

function UploadModal({ onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = () => {
    console.log("Arquivos enviados:", selectedFiles);
    alert("Arquivos enviados com sucesso!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        
        {/* Cabeçalho do modal */}
        <div className="modal-header">
          <h2>Enviar Arquivos</h2>
          <button className="modal-close" onClick={onClose}>✖</button>
        </div>

        {/* Corpo do modal */}
        <div className="modal-body">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file-input"
          />
          {selectedFiles.length > 0 && (
            <ul className="file-list">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé do modal */}
        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-enviar" onClick={handleUpload}>
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}

export default UploadModal;
