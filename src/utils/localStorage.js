// utils/localStorage.js

export const loadPlayers = () => {
  if (typeof window !== "undefined") {
    const players = localStorage.getItem("players");
    console.log("Loaded from local storage:", players); // Debugging
    return players ? JSON.parse(players) : [];
  }
  return [];
};

export const savePlayers = (players) => {
  if (typeof window !== "undefined") {
    console.log("Saving to local storage:", players); // Debugging
    localStorage.setItem("players", JSON.stringify(players));
  }
};
export const handleCashOut = (player, cashOutValue) => {
  console.log("handleCashOut:: ", player, cashOutValue); // Debugging
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  console.log("allPlayers in local storage:", allPlayers); // Debugging
  allPlayers.filter((e) => {
    if (e.name === player.name) {
      e.cashout = cashOutValue;
      e.result = e.cashout - e.buyin;
      console.log(" e.result:::", e.result);
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
  // console.log("handleRebuy:: ", player, cashOutValue); // Debugging
  console.log("allPlayers in local storage:", allPlayers); // Debugging
};

export const handleBalance = () => {
  const allPlayers = JSON.parse(localStorage.getItem("players"));
  if (allPlayers !== null) {
    const resultArray = allPlayers.map((item) => item.result);
    console.log("resultArray:::", resultArray);
    const totalResult = resultArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log("totalResult:::", totalResult);
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
