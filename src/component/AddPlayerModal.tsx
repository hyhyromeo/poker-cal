// components/AddPlayerModal.js

import React, { useState } from "react";
import Modal from "react-modal";

const AddPlayerModal = ({ isOpen, onRequestClose, onSave }: any) => {
  const [name, setName] = useState("");
  const [buyin, setBuyin] = useState("");
  const [rebuy, setRebuy] = useState([]);
  const [rebuyCount, setRebuyCount] = useState(0);
  const [cashout, setCashout] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave({
      name,
      buyin: parseInt(buyin),
      rebuy: rebuy,
      rebuy_count: rebuyCount,
      cashout: parseInt(cashout),
      result: result,
    });
    setName("");
    setBuyin("");
    setRebuy([]);
    setRebuyCount(0);
    setCashout("");
    setResult("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Player"
      shouldCloseOnOverlayClick={true}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-3/4">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              {/* //form header */}
              <div className="flex items-center text-center justify-center">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Add Player
                </h3>
                <button
                  type="button"
                  className="absolute top-2 right-0 bg-white text-base font-medium text-gray-700 "
                  onClick={onRequestClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* //form body */}
              <div className="mt-2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="buyin"
                  >
                    Buy-in Amount
                  </label>
                  <input
                    type="number"
                    id="buyin"
                    value={buyin}
                    onChange={(e) => setBuyin(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rebuy"
                  >
                    Rebuy Amount
                  </label>
                  <input
                    type="number"
                    id="rebuy"
                    value={rebuy}
                    onChange={(e) => setRebuy(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div> */}
                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="cashout"
                  >
                    Cash-out Amount
                  </label>
                  <input
                    type="number"
                    id="cashout"
                    value={cashout}
                    onChange={(e) => setCashout(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPlayerModal;
