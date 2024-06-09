import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { handleCashOut, handleRebuy } from "../utils/localStorage";

export default function PlayerDetailsModal({
  isOpen,
  onRequestClose,
  player,
}: any) {
  const [inputValue, setInputValue] = useState<any>("");
  const [option, setoption] = useState<any>("");
  const [errorsMsg, setErrorsMsg] = useState<any>("");

  const handleCashOutBtn = () => {
    setoption("cashOut");
  };
  const handleCashOutConfirm = () => {
    if (inputValue !== "") {
      handleCashOut(player, inputValue);
      setInputValue("");
      setoption("");
      onRequestClose();
    } else {
      setErrorsMsg("Please enter cash out amount");
    }
  };

  const handleReBuyBtn = () => {
    setoption("reBuy");
  };

  const handleReBuyConfirm = () => {
    if (inputValue !== "") {
      handleRebuy(player, inputValue);
      setInputValue("");
      setoption("");
      onRequestClose();
    } else {
      setErrorsMsg("Please enter cash out amount");
    }
  };
  const handleClose = () => {
    setInputValue("");
    setoption("");
    setErrorsMsg("");
    onRequestClose();
  };

  const reBuyAmountCal = () => {
    if (player.rebuy.length < 1) {
      console.log("less then 1");

      return player.rebuy;
    } else {
      console.log("more then 1");
      return player.rebuy.map((num: any) => `$${num}`).join(" + ");
    }
  };
  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Player"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  items-center justify-center w-3/4 border-none outline-none rounded-xl"
    >
      <div className="rounded-lg overflow-hidden shadow-xl transform transition-all w-full p-4 text-center bg-gray-800 dark:bg-white">
        <p className="text-2xl font-extrabold m-3 text-white dark:text-black">
          {player.name}
          {option && <span className="text-xl"> - {option}</span>}
        </p>

        <div className="flex justify-center text-sm m-3 text-white dark:text-black">
          Total Buy-in: <p className="font-bold ml-3">${player.buyin}</p>
        </div>
        {player.rebuy_count > 0 && (
          <>
            <div className="flex justify-center text-sm m-3 text-white dark:text-black">
              Re-buy count:
              <p className="font-bold ml-3">{player.rebuy_count}</p>
            </div>
            <div className="grid grid-cols-2 text-sm m-3 text-white dark:text-black">
              Re-buy Amount:{" "}
              <p className="font-bold ml-3">{reBuyAmountCal()}</p>
            </div>
          </>
        )}
        {player.cashout > 0 && (
          <div className="text-xl  m-3 text-purple-500 dark:text-black">
            <p className="font-bold ml-3 ">Cash Out: ${player.cashout}</p>
          </div>
        )}
        {option && (
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
            type="number"
            placeholder={`${
              option === "cashOut" ? "Cash Out Amount" : "Re-buy Amount"
            }`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
        )}
        <p className="text-sm m-3 text-red-500">{errorsMsg}</p>
        {!player.cashout && (
          <div className="flex justify-center items-center gap-4 w-full mt-5">
            {option === "reBuy" ? (
              <div
                className={`border border-white bg-green-600 w-1/3 font-bold text-sm h-[40px] text-center flex items-center justify-center text-wrap rounded-xl text-white dark:text-black`}
                onClick={handleReBuyConfirm}
              >
                Confirm
              </div>
            ) : option === "" ? (
              <div
                className="border bg-red-500 flex items-center justify-center text-wrap w-[130px] h-[50px] text-sm font-bold rounded-xl text-white dark:text-black"
                onClick={handleCashOutBtn}
              >
                Cash-Out
              </div>
            ) : (
              ""
            )}

            {option === "cashOut" ? (
              <div
                className={`border border-white bg-green-600 w-1/3 font-bold text-sm h-[40px] text-center flex items-center justify-center text-wrap rounded-xl text-white dark:text-black`}
                onClick={handleCashOutConfirm}
              >
                Confirm
              </div>
            ) : option === "" ? (
              <div
                className="border bg-transparent flex items-center justify-center text-wrap w-[130px] h-[50px] text-sm font-bold rounded-xl text-white dark:text-black"
                onClick={handleReBuyBtn}
              >
                Re-Buy
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
