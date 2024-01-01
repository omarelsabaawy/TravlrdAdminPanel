"use client"

import React from 'react';

interface ModalButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<ModalButtonProps> = ({ onClick }) => {
  return (
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      className="w-full justify-center text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-700 hover:bg-red-600 hover:text-white"
      type="button"
      onClick={onClick}
    >
      Delete your account
    </button>
  );
};

export default DeleteButton;
