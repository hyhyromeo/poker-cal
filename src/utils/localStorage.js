// utils/localStorage.js

export const loadPlayers = () => {
  if (typeof window !== "undefined") {
    const players = localStorage.getItem("players");
    return players ? JSON.parse(players) : [];
  }
  return [];
};

export const savePlayers = (players) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("players", JSON.stringify(players));
  }
};
export const handleCashOut = (player, cashOutValue) => {
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  allPlayers.filter((e) => {
    if (e.name === player.name) {
      e.cashout = cashOutValue;
      e.result = e.cashout - e.buyin;
    }
  });
  localStorage.setItem("players", JSON.stringify(allPlayers));
};
export const handleRebuy = (player, cashOutValue) => {
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  allPlayers.filter((e) => {
    if (e.name === player.name) {
      if (e.rebuy) {
        e.rebuy = [...e.rebuy, cashOutValue];
      } else {
        e.rebuy = [cashOutValue];
      }
      e.rebuy_count = parseInt(e.rebuy_count) + 1;

      e.buyin = parseInt(e.buyin) + parseInt(cashOutValue);
    }
  });
  localStorage.setItem("players", JSON.stringify(allPlayers));
};
export const handleEdit = (player) => {
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  allPlayers.filter((e) => {
    if (e.name === player.name) {
      e.name = player.name;
      e.buyin = player.buyin;
      e.rebuy = player.rebuy;
      e.rebuy_count = player.rebuy_count;
      e.cashout = player.cashout;
      e.result = player.result;
    }
  });
  localStorage.setItem("players", JSON.stringify(allPlayers));
};

export const handleBalance = () => {
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  if (allPlayers !== null) {
    const resultArray = allPlayers.map((item) => item.result);
    const totalResult = resultArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    if (totalResult === 0) {
      return `$${Math.abs(totalResult)}`;
    }
    if (totalResult < 0) {
      return `-$${Math.abs(totalResult)}`;
    } else {
      return `+$${totalResult}`;
    }
  }
  return "";
};
