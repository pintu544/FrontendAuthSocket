import "../styles/Landing.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token || user) {
      toast.success("You are already logged in");

      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="landing-main">
      <h1>Landing Page</h1>
      <p>Hello and welcome!</p>
      <Link to="/login" className="landing-login-button">
        Login
      </Link>
      <Link to="/register" className="landing-register-button">
        Register
      </Link>
    </div>
  );
};

export default Landing;
