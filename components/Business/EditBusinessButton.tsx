"use client"

import React from 'react';

interface ModalButtonProps {
  onClick: () => void;
}

const EditBusinessButton: React.FC<ModalButtonProps> = ({ onClick }) => {
  return (
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      className="font-medium text-blue-600 hover:underline"
      type="button"
      onClick={onClick}
    >
      Edit
    </button>
  );
};

export default EditBusinessButton;
