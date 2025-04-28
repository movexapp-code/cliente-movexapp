// src/components/Login.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./css/Login.css"; // Importa el archivo CSS
import logo from "../assets/logocalistenia.png";
import { FaWhatsapp } from "react-icons/fa";
import { CiInstagram, CiYoutube } from "react-icons/ci";
import Loader from "./Loader"; // Asegúrate de que el componente Loader esté en la ruta correcta

const Login = () => {
  const { login, loading } = useContext(AppContext);
  const [user, setUser] = useState({});

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <Loader message={"Ingresando..."} /> // Cambia el mensaje según sea necesario
    );
  }

  const handleSubmit = () => {
    login(user);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Calistenia Team" className="logo" />
        <h4 className="login-title">Iniciar Sesión en MOVEX APP</h4>

        <div className="input-group">
          <label>Usuario</label>
          <input
            type="text"
            name="email"
            onChange={(e) => onChange(e)}
            placeholder="Ingresa tu Usuario o Email"
          />
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            onChange={(e) => onChange(e)}
            name="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button onClick={() => handleSubmit()} className="btn-login">
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        <p className="register-link">¿Quieres ser parte de Calistenia Team?</p>
        <div className="login-icons-social">
          <a href="https://www.instagram.com/calisteniapty/" target="_blank">
            <CiInstagram className="icon-social" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCO1v1J7qZ6wT4Zg2Q6O8s9w"
            target="_blank"
          >
            <CiYoutube className="icon-social" />
          </a>
          <a href="https://wa.me/50762115111" target="_blank">
            <FaWhatsapp className="icon-social" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
