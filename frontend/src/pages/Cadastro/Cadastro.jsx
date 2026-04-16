import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await api.post("/usuarios/cadastro", { nome, email, senha });
      alert("Usuário cadastrado com sucesso!");
      navigate("/login"); 
    } catch (err) {
      setErro(err.response?.data?.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleCadastro}>
        <h2>Criar Conta</h2>
        {erro && <p className="error-message">{erro}</p>}
        
        <div className="input-group">
          <label>Nome Completo</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
            placeholder="Digite seu nome"
          />
        </div>

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
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button type="submit" className="btn-cadastro">Cadastrar</button>
        
        <p className="link-login">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;