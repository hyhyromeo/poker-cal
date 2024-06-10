// components/PlayerTable.js

import React, { useState } from "react";
import PlayerDetailsModal from "./PlayerDetailsModal";

const PlayerTable = ({ players, onPlayerSelect }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerDetail, setPlayerDetail] = useState([]);
  const handlePlayerClick = (player: any) => {
    setModalIsOpen(true);
    setPlayerDetail(player);
    onPlayerSelect((prev: any) => !prev); // Pass the selected player to the parent component
  };
  const onRequestClose = () => {
    setModalIsOpen(false);
    onPlayerSelect((prev: any) => !prev); // Pass the selected player to the parent component
  };
  const formatCurrency = (num: number) => {
    if (num < 0) {
      return `-$${Math.abs(num)}`;
    } else {
      return `+$${num}`;
    }
  };
  return (
    <div className="overflow-x-auto  w-screen p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-center text-wrap w-full">
          <tr className="w-full">
            <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">
              Player Name
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
              Total Buy-in
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
              CashOut
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any, index: number) => (
            <tr
              key={index}
              className={`${
                player.cashout ? "bg-gray-300" : "bg-white"
              } border-t border-gray-200 text-center `}
              onClick={() => handlePlayerClick(player)}
            >
              <td className="py-3 px-4 text-gray-700">{player.name}</td>
              <td className="py-3 px-4 text-gray-700">{player.buyin}</td>
              <td className="py-3 px-4 ">
                {player.cashout ? (
                  <p
                    className={`${
                      player.result > 0
                        ? "text-green-500"
                        : player.result === 0
                        ? "text-gray-500"
                        : "text-red-500"
                    } font-extrabold text-xl`}
                  >
                    {formatCurrency(player.result)}
                  </p>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PlayerDetailsModal
        isOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        player={playerDetail}
      />
    </div>
  );
};

export default PlayerTable;
