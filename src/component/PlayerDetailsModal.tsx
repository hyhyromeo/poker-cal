import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { handleCashOut, handleRebuy, handleEdit } from "../utils/localStorage";
import { Back, CloseBtn, Edit } from "../utils/icons";

export default function PlayerDetailsModal({
  isOpen,
  onRequestClose,
  player,
}: any) {
  const [inputValue, setInputValue] = useState<any>("");
  const [option, setoption] = useState<any>("");
  const [errorsMsg, setErrorsMsg] = useState<any>("");
  const [tempPlayerDetails, setTempPlayerDetails] = useState<any>(player);
  console.log("player", player);
  console.log("tempPlayerDetails", tempPlayerDetails);
  const handleCashOutBtn = () => {
    setoption("cashOut");
  };

  // useEffect(() => {}, [tempPlayerDetails]);

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
    setoption("rebuy");
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
  const handleUpdateBtn = () => {
    if (option === "edit") {
      setoption("");
      setTempPlayerDetails(player);
      console.log("handleUpdateBtn : ", tempPlayerDetails);

      handleEdit(tempPlayerDetails);
      onRequestClose();
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
      return player.rebuy;
    } else {
      return player.rebuy.map((num: any) => `$${num}`).join(" + ");
    }
  };

  const handleEditBtn = () => {
    // setoption("cashOut");
    setTempPlayerDetails(player);
    console.log("tempPlayerDetails", tempPlayerDetails);
    setoption("edit");
  };
  const handleBackBtn = () => {
    setoption("");
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
        {option !== "edit" ? (
          <span
            onClick={handleEditBtn}
            className={`${player.cashout ? "" : ""} absolute top-4 right-4`}
          >
            {Edit}
          </span>
        ) : (
          <span
            onClick={handleBackBtn}
            className={`${player.cashout ? "" : ""} absolute top-4 left-4`}
          >
            {Back}
          </span>
        )}

        <p className="text-2xl font-extrabold m-3 text-white dark:text-black">
          {player.name}
          {option && <span className="text-xl"> - {option}</span>}
        </p>
        <div className="flex justify-center items-center flex-col w-full ml-2">
          <div className="grid grid-cols-2 justify-center text-sm m-3 text-white dark:text-black">
            <p className="flex justify-center items-center text-center">
              Total Buy-in:
            </p>
            {option === "edit" ? (
              <input
                className="text-black dark:text-white text-center rounded-lg"
                type="number"
                placeholder={tempPlayerDetails.buyin}
                value={tempPlayerDetails.buyin}
                onChange={(e) => {
                  setTempPlayerDetails({
                    ...tempPlayerDetails,
                    buyin: e.target.value,
                  });
                }}
              ></input>
            ) : (
              <p className="font-bold text-start ml-9">${player.buyin}</p>
            )}
          </div>
          {player.rebuy_count > 0 && (
            <>
              <div className="grid grid-cols-2 w-full justify-center text-sm  text-white dark:text-black">
                <p className="text-end w-full">Re-buy count:</p>

                <p className="font-bold text-start ml-10">
                  {option === "edit"
                    ? tempPlayerDetails.rebuy_count
                    : player.rebuy_count}
                </p>
              </div>
              <div className="grid grid-cols-2 text-sm m-3 text-white dark:text-black">
                <p className="flex justify-center items-center text-center">
                  Re-buy Amount:
                </p>
                <div className="">
                  {option === "edit" ? (
                    tempPlayerDetails.rebuy.map((rebuyValue, i) => {
                      return (
                        <div
                          key={i}
                          className="flex w-full justify-center items-center text-center ml-3"
                        >
                          <div className="text-black dark:text-black text-center rounded-lg w-full border flex justify-center items-center">
                            {tempPlayerDetails.rebuy[i]}
                          </div>
                          <span
                            className=""
                            onClick={() => {
                              console.log(i);

                              // Check if the index is valid
                              if (
                                i >= 0 &&
                                i < tempPlayerDetails.rebuy.length
                              ) {
                                let tempI = tempPlayerDetails.rebuy[i];
                                tempPlayerDetails.rebuy.splice(i, 1);
                                console.log(tempI);

                                // Remove one element at the specified index
                                setTempPlayerDetails({
                                  ...tempPlayerDetails,
                                  rebuy: tempPlayerDetails.rebuy,
                                  buyin:
                                    parseInt(tempPlayerDetails.buyin) -
                                    parseInt(tempI),
                                  rebuy_count:
                                    tempPlayerDetails.rebuy_count - 1,
                                });
                              } else {
                                console.log("Invalid index");
                              }
                            }}
                          >
                            {CloseBtn}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="font-bold text-start ml-9">
                      {reBuyAmountCal()}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          {player.cashout > 0 && (
            <div className="grid grid-cols-2 text-xl font-bold m-3 text-white dark:text-black">
              <p className="flex justify-center items-center text-center">
                Cash Out:
              </p>
              <p className=" text-start ml-9">${player.cashout}</p>
            </div>
          )}
        </div>

        {option == "rebuy" ||
          (option == "cashOut" && (
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
              type="number"
              placeholder={`${
                option === "cashOut" ? "Cash Out Amount" : "Re-buy Amount"
              }`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
          ))}
        {option === "cashOut" && player.cashout && (
          <div className={`w-full items-center justify-center flex py-3`}>
            <div
              onClick={handleCashOutConfirm}
              className="border border-white bg-green-600 w-1/3 font-bold text-sm h-[40px] text-center flex items-center justify-center text-wrap rounded-xl text-white dark:text-black"
            >
              Confirm
            </div>
          </div>
        )}
        <p className="text-sm m-3 text-red-500">{errorsMsg}</p>
        {!player.cashout && (
          <div className="flex justify-center items-center gap-4 w-full mt-5">
            {option === "rebuy" ? (
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
                className="border border-white dark:border-black bg-transparent flex items-center justify-center text-wrap w-[130px] h-[50px] text-sm font-bold rounded-xl text-white dark:text-black"
                onClick={handleReBuyBtn}
              >
                Re-Buy
              </div>
            ) : option === "edit" ? (
              <div
                className="border border-white dark:border-black bg-transparent flex items-center justify-center text-wrap w-[130px] h-[50px] text-sm font-bold rounded-xl text-white dark:text-black"
                onClick={handleUpdateBtn}
              >
                Update
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
