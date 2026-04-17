import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CadastroDesaparecido.css";

const CadastroDesaparecido = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    caracteristicas: "",
    data_desaparecimento: "",
    local_desaparecimento: "",
    imagem_pessoa: ""
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await api.post("/desaparecidos", formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (err) {
      setMensagem(err.response?.data?.error || "Erro ao cadastrar. Verifique se você está logada.");
    }
  };

  return (
    <div className="cadastro-desaparecido-container">
      <form onSubmit={handleSubmit} className="cadastro-desaparecido-form">
        <h2>Cadastrar Pessoa Desaparecida</h2>
        {mensagem && <p className="error-message">{mensagem}</p>}

        <input type="text" name="nome" placeholder="Nome completo" onChange={handleChange} required />
        <input type="number" name="idade" placeholder="Idade" onChange={handleChange} required />
        
        <textarea 
          name="caracteristicas" 
          placeholder="Características físicas (ex: cicatrizes, tatuagens, cor da roupa)" 
          onChange={handleChange} 
          required 
        />

        <div className="input-group">
          <label>Data do Desaparecimento</label>
          <input type="date" name="data_desaparecimento" onChange={handleChange} required />
        </div>

        <input type="text" name="local_desaparecimento" placeholder="Último local visto" onChange={handleChange} required />
        
        <input 
          type="text" 
          name="imagem_pessoa" 
          placeholder="URL da imagem (ex: do Google Drive ou Imgur)" 
          onChange={handleChange} 
        />

        <button type="submit" className="btn-enviar">Publicar Cadastro</button>
      </form>
    </div>
  );
};

export default CadastroDesaparecido;