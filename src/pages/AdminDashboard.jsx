import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "../styles/AdminDashboard.css";
import { toast } from "react-toastify";
const AdminDashboard = ({ onLogout }) => {
  const [players, setPlayers] = useState([]);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    email: "",
    role: "player",
    password: "",
  });
  const [editingPlayer, setEditingPlayer] = useState(null);
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
      if (err.response && err.response.status === 401) {
        onLogout();
      }
    }
  };
  useEffect(() => {
    fetchPlayers();
    const socket = io("https://backendauthsocket.onrender.com");

    socket.on("clickCountUpdated", (data) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player._id === data.id
            ? { ...player, clickCount: data.clickCount }
            : player
        )
      );
    });

    socket.on("userStatusUpdated", (data) => {
      setPlayers((prevPlayers) =>
        prevPlayers?.users?.map((player) =>
          player._id === data.id
            ? { ...player, isActive: data.isActive }
            : player
        )
      );
    });

    return () => {
      socket.off("clickCountUpdated");
      socket.off("userStatusUpdated");
    };
  }, [players]);

  const handleBlockUnblockPlayer = async (id, isActive) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await axios.post(
        `https://backendauthsocket.onrender.com/api/game/block/${id}`,
        { isActive: !isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPlayers();
      toast.success(
        ` ${isActive ? "blocked" : "unblocked"} successful` +
          response.data.message
      );
    } catch (err) {
      console.error("Error updating player:", err);
      toast.error(err.response?.data?.message || "Failed to block player.");
    }
  };
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await axios.post(
        "https://backendauthsocket.onrender.com/api/game/players",
        newPlayer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPlayers();
      setNewPlayer({ name: "", email: "", role: "player", password: "" });
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error adding player:", err);
      toast.error(err.response?.data?.message || "Failed to add player.");
    }
  };

  const handleEditPlayer = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.put(
        `https://backendauthsocket.onrender.com/api/game/players/${editingPlayer._id}`,
        editingPlayer,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPlayers();
      setEditingPlayer(null);
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error editing player:", err);
      toast.error(err.response?.data?.message || "Failed to edit player.");
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await axios.delete(
        `https://backendauthsocket.onrender.com/api/game/players/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchPlayers();
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error deleting player:", err);
      toast.error(err.response?.data?.message || "Failed to delete player.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>

      <form onSubmit={handleAddPlayer}>
        <h2>Add New Player</h2>
        <input
          type="text"
          placeholder="name"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newPlayer.email}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="password"
          value={newPlayer.password}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, password: e.target.value })
          }
          required
        />
        <select
          value={newPlayer.role}
          onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="player">Player</option>
        </select>
        <button type="submit">Add Player</button>
      </form>

      {editingPlayer && (
        <form onSubmit={handleEditPlayer}>
          <h2>Edit Player</h2>
          <input
            type="text"
            placeholder="name"
            value={editingPlayer.name}
            onChange={(e) =>
              setEditingPlayer({ ...editingPlayer, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={editingPlayer.email}
            onChange={(e) =>
              setEditingPlayer({ ...editingPlayer, email: e.target.value })
            }
          />
          <select
            value={editingPlayer.role}
            onChange={(e) =>
              setEditingPlayer({ ...editingPlayer, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="player">Player</option>
          </select>
          <button type="submit">Update Player</button>
        </form>
      )}
      <ul>
        {players?.users?.map((player, index) => (
          <li key={player._id}>
            {index + 1}
            {player.nameclickCount} - Clicks: {player.clickCount} - Status:
            {player.isActive ? "Active" : "Blocked"}
            <button
              onClick={() =>
                handleBlockUnblockPlayer(player._id, player.isActive)
              }
            >
              {player.isActive ? "Block" : "Unblock"}
            </button>
            <button onClick={() => handleDeletePlayer(player._id)}>
              Delete
            </button>
            <button onClick={() => setEditingPlayer(player)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
