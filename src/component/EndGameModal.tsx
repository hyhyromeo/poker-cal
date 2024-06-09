// components/AddPlayerModal.js

import React, { useEffect } from "react";
import Modal from "react-modal";

const EndGameModal = ({ isOpen, onRequestClose, onSave }: any) => {
  const handleConfirm = (e: any) => {
    e.preventDefault();
    onSave();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm End Game"
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full"
    >
      <div className=" rounded-lg overflow-hidden shadow-xl transform transition-all w-3/4 p-4 text-center bg-gray-800 dark:bg-white">
        <p className="text-2xl m-3 text-white dark:text-black">
          Confirm End Game ?
        </p>
        <div className="flex justify-center items-center gap-4 w-full">
          <div
            className="border border-white bg-red-500 px-4 py-3 w-1/2 font-bold rounded-xl text-white dark:text-black"
            onClick={handleConfirm}
          >
            Confirm
          </div>
          <div
            className="border bg-transparent px-4 py-3 w-1/2 font-bold rounded-xl text-white dark:text-black"
            onClick={onRequestClose}
          >
            Back
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EndGameModal;
