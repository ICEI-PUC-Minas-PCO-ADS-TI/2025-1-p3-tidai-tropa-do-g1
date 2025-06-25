import React, { useState } from 'react';
import "../styles/UploadModal.css"; 

const API_BASE_URL = 'http://localhost:8000'; 


function UploadModal({ onClose, userId }) { 

    const [selectedFile, setSelectedFile] = useState(null); 
    const [statusMessage, setStatusMessage] = useState(''); // Mensagem de status para o usuário
    const [messageType, setMessageType] = useState(''); // Tipo da mensagem (success/error/info/warning)
    const [isLoading, setIsLoading] = useState(false); // Indica se o upload está em andamento

    // 1. Manipulador de mudança para o input de arquivo 
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Pega o primeiro (e único) arquivo selecionado
        setStatusMessage(''); // Limpa a mensagem de status anterior ao selecionar novo arquivo
        setMessageType('');
    };

    // 2. Manipulador de envio do upload (agora lida com apenas um arquivo)
    const handleUpload = async () => { // Função assíncrona
        // Validações antes de enviar
        if (!selectedFile) {
            displayStatus('Por favor, selecione um arquivo para enviar.', 'error');
            return;
        }
        if (!userId) { // Verifica se o userId foi passado
            displayStatus('ID do usuário não fornecido. Não é possível enviar.', 'error');
            return;
        }

        setIsLoading(true); // Ativa o estado de carregamento
        displayStatus(`Enviando arquivo "${selectedFile.name}"...`, 'info'); // Mensagem de processamento

        // Cria o objeto FormData
        const formData = new FormData();
        formData.append('file', selectedFile); // Anexa o único arquivo selecionado
        formData.append('user_id', userId); // Anexa o ID do usuário (vindo da prop)

        try {
            // Faz a requisição POST para a API Python
            const response = await fetch(`${API_BASE_URL}/documents/upload/`, {
                method: 'POST',
                body: formData, // FormData é automaticamente configurado como multipart/form-data
            });

            const resultData = await response.json(); // Lida com a resposta JSON do backend

            if (response.ok) { // Verifica se o status HTTP é 2xx (Sucesso)
                displayStatus(`Sucesso! Arquivo "${selectedFile.name}" processado. ID: ${resultData.document_id}. Mensagem: ${resultData.message}`, 'success');
                setSelectedFile(null); // Limpa o input de arquivo após o sucesso
                // Opcional: Fechar o modal automaticamente após o sucesso
                // setTimeout(() => onClose(), 2000); 
            } else { // Se o status for erro (4xx, 5xx)
                // resultData.detail é onde o FastAPI coloca mensagens de erro detalhadas
                displayStatus(`Erro (${response.status}) ao enviar "${selectedFile.name}": ${resultData.detail || 'Falha desconhecida.'}`, 'error');
            }
        } catch (error) {
            console.error(`Erro de rede ao enviar arquivo "${selectedFile.name}":`, error);
            displayStatus(`Erro de rede ou requisição: ${error.message}`, 'error');
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento, ocorra sucesso ou falha
        }
    };

    // Função auxiliar para atualizar o estado da mensagem de status na interface
    const displayStatus = (message, type) => {
        setStatusMessage(message);
        setMessageType(type);
    };

    return (
        <div className="modal-overlay">
            <div className="upload-modal">
                {/* Cabeçalho do modal */}
                <div className="modal-header">
                    <h2>Adicionar Arquivos</h2>
                    <button className="modal-close" onClick={onClose} disabled={isLoading}>✖</button>
                </div>

                {/* Corpo do modal */}
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="fileInput" className="file-input-label">
                            {/* Input de arquivo (AGORA SEM O ATRIBUTO 'multiple') */}
                            <input 
                                type="file" 
                                onChange={handleFileChange} 
                                className="file-input-hidden" 
                                id="fileInput"
                                disabled={isLoading} // Desabilita durante o carregamento
                                required 
                            />
                            {/* Mostra o nome do arquivo selecionado ou um texto padrão */}
                            {selectedFile ? selectedFile.name : 'Selecionar Arquivo...'}
                        </label>
                    </div>
                    
                    {/* Mensagem de status */}
                    {statusMessage && ( 
                        <div className={`status-message ${messageType}`}>
                            {statusMessage}
                        </div>
                    )}
                </div>

                {/* Rodapé do modal */}
                <div className="modal-footer">
                    <button className="btn-cancelar" onClick={onClose} disabled={isLoading}>
                        {isLoading ? 'Aguarde...' : 'Cancelar'}
                    </button>
                    {/* O botão "Enviar" só é habilitado se não estiver carregando E se um arquivo foi selecionado */}
                    <button className="btn-enviar" onClick={handleUpload} disabled={isLoading || !selectedFile}>
                        {isLoading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadModal;