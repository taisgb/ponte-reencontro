import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/usuarios/login", { email, senha });
     
      localStorage.setItem("token", response.data.token);
      
      alert("Login realizado com sucesso!");
      navigate("/"); 
    } catch (err) {
      setErro(err.response?.data?.message || "E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Acessar Conta</h2>
        <p className="subtitle">Entre para ajudar nas buscas</p>
        
        {erro && <p className="error-message">{erro}</p>}
        
        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="seu@email.com"
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit" className="btn-login">Entrar</button>
        
        <p className="link-cadastro">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;