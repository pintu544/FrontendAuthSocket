import io from "socket.io-client";
import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Login,
  Register,
  AdminDashboard,
  PlayerDashboard,
  RankPage,
  Logout,
} from "./pages";
import { ToastContainer, toast } from "react-toastify";
import { SocketProvider } from "./context/SocketContext.jsx";

function App() {
  const [user, setUser] = useState(null);
  console.log(user, "user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "login",
          element: <Login onLogin={handleLogin} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "dashboard",
          element: user ? (
            user === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <PlayerDashboard onLogout={handleLogout} />
            )
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "rank-page",
          element: user === "player" ? <RankPage /> : <Navigate to="/" />,
        },
        {
          path: "logout",
          element: <Logout onLogout={handleLogout} />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SocketProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </SocketProvider>
  );
}

export default App;
