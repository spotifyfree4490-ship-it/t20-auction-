import { useState, useEffect } from "react";
import { socket } from "./socket";
import "./App.css";

function App() {
  const [team, setTeam] = useState("");
  const [joined, setJoined] = useState(false);
  const [bid, setBid] = useState("");
  const [current, setCurrent] = useState({ amount: 0, team: "" });

  useEffect(() => {
    socket.on("bidUpdate", (data) => setCurrent(data));
    socket.on("playerSold", (data) => {
      alert(`Sold to ${data.team} for ₹${data.amount} Cr`);
    });

    return () => {
      socket.off("bidUpdate");
      socket.off("playerSold");
    };
  }, []);

  const joinTeam = () => {
    if (!team) return alert("Enter team name");
    socket.emit("joinTeam", team);
    setJoined(true);
  };

  const placeBid = () => {
    if (!bid) return;
    socket.emit("placeBid", {
      amount: Number(bid),
      team
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🏏 T20 Auction</h1>

      {!joined ? (
        <>
          <input placeholder="Enter Team Name" onChange={(e) => setTeam(e.target.value)} />
          <button onClick={joinTeam}>Join Auction</button>
        </>
      ) : (
        <>
          <h2>Team: {team}</h2>
          <h3>Current Bid: ₹{current.amount} Cr</h3>
          <h3>Leading: {current.team || "None"}</h3>

          <input type="number" placeholder="Enter bid" onChange={(e) => setBid(e.target.value)} />
          <button onClick={placeBid}>Place Bid</button>
        </>
      )}
    </div>
  );
}

export default App;
