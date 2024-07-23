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
      <table className="min-w-full bg-white shadow-md shadow-gray dark:shadow-[#a8a8a8] rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-center text-wrap w-full">
          <tr className="justify-between">
            <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
              {/* total */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 flex justify-center">
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
              <td className="py-3 px-4 text-gray-700">${player.buyin}</td>
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
