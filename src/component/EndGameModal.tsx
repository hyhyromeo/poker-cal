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
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  items-center justify-center w-3/4 border-none outline-none rounded-xl"
    >
      <div className="py-10 px-5 rounded-lg overflow-hidden shadow-xl transform transition-all w-full text-center bg-gray-800 dark:bg-white">
        <p className="text-2xl m-3 text-white dark:text-black">
          Confirm End Game ?
        </p>
        <div className="flex justify-center items-center gap-4 w-full px-5">
          <div
            className="border border-white bg-red-500 px-4 py-3 w-[100px] font-bold rounded-xl text-white dark:text-black"
            onClick={handleConfirm}
          >
            Confirm
          </div>
          <div
            className="border bg-transparent px-4 py-3 w-[100px] font-bold rounded-xl text-white dark:text-black"
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
