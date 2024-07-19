// components/AddPlayerModal.js

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { handleBalance } from "../utils/localStorage";

export default function GameBalanceModal({
  isOpen,
  onRequestClose,
  onSave,
}: any) {
  const [balanceResult, setbalanceResult] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    setbalanceResult(handleBalance);
  }, [isOpen]);

  const handleConfirm = (e: any) => {
    if (balanceResult.toString() !== "$0") {
      setErr("Balance Result is not $0 !!");
    } else {
      setErr("");
      onSave();
      handleClose();
      e.preventDefault();
    }
    if (err) {
      onSave();
      handleClose();
      e.preventDefault();
    }
  };

  const handleClose = () => {
    setErr("");
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Game Balance"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  items-center justify-center w-3/4 border-none outline-none rounded-xl"
    >
      <div className="py-10 px-5 rounded-lg overflow-hidden shadow-xl transform transition-all w-full text-center bg-gray-800 dark:bg-white">
        <p className="text-2xl m-3 text-white dark:text-black">Game Balance</p>
        <div className="text-3xl m-3 text-white dark:text-black">
          {balanceResult}
        </div>

        <div className="text-3xl m-3 text-red-500">{err}</div>
        <div className="flex justify-center items-center gap-4 w-full px-5">
          <div
            className={`border border-white dark:border-black  ${
              err ? "bg-red-500" : "bg-transparent"
            } text-wrap px-4 py-3 w-2/3 font-bold rounded-xl text-white dark:text-black`}
            onClick={handleConfirm}
          >
            {err ? "End Anyway" : "End Game"}
          </div>
          {/* <div
            className="border bg-transparent px-4 py-3 w-[100px] font-bold rounded-xl text-white dark:text-black"
            onClick={onRequestClose}
          >
            Back
          </div> */}
        </div>
      </div>
    </Modal>
  );
}
