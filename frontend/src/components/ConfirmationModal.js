// ConfirmationModal.js
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      maxWidth: '400px',
      textAlign: 'center',
      background: '#f4f4f4', // Light gray background
      border: 'none', // Remove modal border
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    title: {
      color: '#4E7299', // Title color
    },
    button: {
      border: 'none', // Remove button border
      margin: '0 10px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '16px',
      borderRadius: '5px',
    },
    confirmButton: {
      backgroundColor: '#438A38', // Confirm button color
      color: 'white', // Text color
    },
    cancelButton: {
      backgroundColor: 'grey', // Cancel button color
      color: 'white', // Text color
    },
  };
  
  const ConfirmationModal = ({ isOpen, title, message, onCancel, onConfirm }) => {
    return (
      <Modal
        isOpen={isOpen}
        style={{
          content: customStyles.content,
          overlay: customStyles.overlay,
        }}
        contentLabel="Confirmation Modal"
      >
        <h2 style={{ color: customStyles.title.color }}>{title}</h2>
        <p>{message}</p>
        <button
          style={{
            ...customStyles.button,
            ...customStyles.cancelButton,
          }}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          style={{
            ...customStyles.button,
            ...customStyles.confirmButton,
          }}
          onClick={onConfirm}
        >
          Confirm
        </button>
      </Modal>
    );
  };
  

export default ConfirmationModal;
