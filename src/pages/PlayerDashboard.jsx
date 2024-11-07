import React, { useState, useEffect } from "react";
import bananaImage from "../assets/banana.jpeg";
import "../styles/PlayerDashboard.css";
import Rankpage from "./RankPage";
import { useSocket } from "../context/SocketContext.jsx";

const PlayerDashboard = ({ onLogout }) => {
  const [clickCount, setClickCount] = useState(0);
  const socket = useSocket();
  const userId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    if (socket) {
      socket.emit("initialize", userId);

      socket.on("updateClickCount", (count) => {
        setClickCount(count);
      });
    }

    return () => {
      if (socket) {
        socket.off("updateClickCount");
      }
    };
  }, [socket, userId]);

  const handleBananaClick = () => {
    if (socket) {
      socket.emit("bananaClick", userId);
    }
  };

  return (
    <div className="player-dashboard">
      <div className="click-counter">{clickCount}</div>
      <div className="banana-container" onClick={handleBananaClick}>
        <img src={bananaImage} alt="Banana" className="banana-image" />
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
      <Rankpage /> {/* Relying on socket context */}
    </div>
  );
};

export default PlayerDashboard;
