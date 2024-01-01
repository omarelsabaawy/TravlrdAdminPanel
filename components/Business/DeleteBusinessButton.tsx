"use client"

import React from 'react';

interface ModalButtonProps {
  onClick: () => void;
}

const DeleteBusinessButton: React.FC<ModalButtonProps> = ({ onClick }) => {
  return (
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      className="font-medium text-red-600 hover:underline ml-3"
      type="button"
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export default DeleteBusinessButton;
