import { useState, useEffect } from "react";
import AddPlayerModal from "../component/AddPlayerModal";
import EndGameModal from "../component/EndGameModal";
import PlayerTable from "../component/PlayerTable";
import { loadPlayers, savePlayers } from "../utils/localStorage";
import React from "react";

export default function Home() {
  const [players, setPlayers] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [endGameModalIsOpen, setEndGameModalIsOpenn] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(false);

  useEffect(() => {
    // Load players from local storage when the component mounts
    const savedPlayers = loadPlayers();
    console.log("Loaded players:", savedPlayers); // Debugging
    console.log("Loaded"); // Debugging

    setPlayers(savedPlayers);
  }, [selectedPlayer]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openEndGameModal = () => setEndGameModalIsOpenn(true);
  const closeEndGameModal = () => setEndGameModalIsOpenn(false);

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
          className="mb-4 inline-flex justify-center rounded-md border border-yellow-300 shadow-sm px-4 py-2 text-base font-medium "
        >
          + Player
        </button>
      </div>
      <PlayerTable players={players} onPlayerSelect={handlePlayerSelect} />
      {players.length > 0 && (
        <button
          onClick={openEndGameModal}
          className={`mt-4 inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 text-base font-medium text-black dark:text-white`}
        >
          End Game
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
    </div>
  );
}
