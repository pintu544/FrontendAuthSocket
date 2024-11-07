import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "../assets/download.jpeg";
import Logo from "../assets/logo.png";
import "../styles/Register.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const role = e.target.role.value;

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const formData = {
      username: `${name} ${lastname}`,
      email,
      password,
      role,
    };

    try {
      await axios.post(
        "https://backendauthsocket.onrender.com/api/v1/register",
        formData
      );
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to register. Please try again."
      );
    }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token || user) {
      toast.success("You are already logged in");

      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="Background" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="register-center">
            <h2>Welcome to the Click Game!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" required />
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />
              <input type="email" placeholder="Email" name="email" required />

              <select name="role" required>
                <option value="admin">Admin</option>
                <option value="player">Player</option>
              </select>

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={togglePasswordVisibility} />
                ) : (
                  <FaEye onClick={togglePasswordVisibility} />
                )}
              </div>

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={togglePasswordVisibility} />
                ) : (
                  <FaEye onClick={togglePasswordVisibility} />
                )}
              </div>

              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
