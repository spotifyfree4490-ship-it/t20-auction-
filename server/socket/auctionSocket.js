let currentBid = 0;
let currentTeam = null;

module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("joinTeam", (teamName) => {
      socket.team = teamName;
    });

    socket.on("placeBid", ({ amount, team }) => {
      if (amount > currentBid) {
        currentBid = amount;
        currentTeam = team;
        io.emit("bidUpdate", { amount: currentBid, team: currentTeam });
      }
    });

    socket.on("sold", () => {
      io.emit("playerSold", { team: currentTeam, amount: currentBid });
    });

    socket.on("nextPlayer", () => {
      currentBid = 0;
      currentTeam = null;
      io.emit("newPlayer");
    });

  });
};
