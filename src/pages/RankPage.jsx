import React, { useState, useEffect, memo } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import axios from "axios";

const RankPage = () => {
  const [players, setPlayers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));
        const response = await axios.get(
          "https://backendauthsocket.onrender.com/api/v1/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlayers(response.data);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    fetchPlayers();

    if (socket) {
      socket.on("rankUpdate", (updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
    }

    return () => {
      if (socket) {
        socket.off("rankUpdate");
      }
    };
  }, [socket]);

  return (
    <div>
      <h1>Player Rankings</h1>
      <ul>
        {players.users?.map((player, index) => (
          <li key={player._id}>
            {index + 1}. {player.name} - Clicks: {player.clickCount} - Status:
            {player.isActive ? "Active" : "Blocked"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(RankPage);
