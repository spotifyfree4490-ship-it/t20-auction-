import { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {
  const [team, setTeam] = useState("");
  const [bid, setBid] = useState(0);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    socket.on("bidUpdate", (data) => setCurrent(data));
    socket.on("playerSold", (data) => {
      alert(`Sold to ${data.team} for ₹${data.amount} Cr`);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>T20 Auction</h1>

      <input placeholder="Team Name" onChange={(e) => setTeam(e.target.value)} />
      <button onClick={() => socket.emit("joinTeam", team)}>Join</button>

      <h2>Current Bid: ₹{current.amount || 0} Cr</h2>
      <h3>Leading: {current.team || "None"}</h3>

      <input type="number" onChange={(e) => setBid(Number(e.target.value))} />
      <button onClick={() => socket.emit("placeBid", { amount: bid, team })}>Bid</button>
    </div>
  );
}

export default App;