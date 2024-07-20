import { useState, useEffect } from "react";
import AddPlayerModal from "../component/AddPlayerModal";
import EndGameModal from "../component/EndGameModal";
import PlayerTable from "../component/PlayerTable";
import { loadPlayers, savePlayers } from "../utils/localStorage";
import React from "react";
import GameBalanceModal from "../component/GameBalanceModal";

export default function Home() {
  const [players, setPlayers] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [endGameModalIsOpen, setEndGameModalIsOpen] = useState(false);
  const [gameBalanceModalIsOpen, setGameBalanceModalIsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(false);

  useEffect(() => {
    // Load players from local storage when the component mounts
    const savedPlayers = loadPlayers();
    setPlayers(savedPlayers);
  }, [selectedPlayer, modalIsOpen]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const closeEndGameModal = () => setEndGameModalIsOpen(false);
  const handleBalanceBtn = () => {
    const allPlayersCashedOut = players.filter((player: any) => {
      return player.cashout === null;
    });

    if (allPlayersCashedOut.length > 0) {
      alert("Please cash out all players");
    } else {
      setGameBalanceModalIsOpen((prevState) => !prevState);
    }
  };
  const closeGameBalanceModal = () => setGameBalanceModalIsOpen(false);
  const handleSavePlayer = (player: any) => {
    savePlayers([...players, player]);
    setPlayers([...players, player]);
  };
  const handleEndGame = () => {
    savePlayers([]);
    setPlayers([]);
  };
  const handlePlayerSelect = () => {
    setSelectedPlayer((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center w-screen">
      <div className="flex justify-between align-middle items-center w-full">
        <h1 className="text-2xl font-bold mb-4">Poker Cal</h1>
        <button
          onClick={openModal}
          className="mb-4 w-fit p-[3%] inline-flex justify-center rounded-full border bg-gray-200 shadow-md dark:shadow-[#a8a8a8] text-base font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white dark:text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </button>
      </div>
      <PlayerTable players={players} onPlayerSelect={handlePlayerSelect} />
      {players.length > 0 && (
        <button
          onClick={handleBalanceBtn}
          className={`mt-4 inline-flex justify-center rounded-md border bg-gray-50 shadow-md dark:shadow-[#a8a8a8] px-4 py-2 text-base font-medium text-black dark:text-black`}
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
              d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
            />
          </svg>
        </button>
      )}
      <AddPlayerModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSave={handleSavePlayer}
      />
      <EndGameModal
        isOpen={endGameModalIsOpen}
        onRequestClose={closeEndGameModal}
        onSave={handleEndGame}
      />
      <GameBalanceModal
        players={players}
        isOpen={gameBalanceModalIsOpen}
        onRequestClose={closeGameBalanceModal}
        onSave={handleEndGame}
      />
    </div>
  );
}
