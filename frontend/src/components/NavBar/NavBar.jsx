import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Início</Link>
        
        {!token ? (
          <>
            <Link to="/login" className="nav-btn login">Entrar</Link>
            <Link to="/cadastro" className="nav-btn cadastro">Cadastre-se</Link>
          </>
        ) : (
          <>
            <Link to="/cadastrar-desaparecido" className="nav-link">Novo Registro</Link>
            <button onClick={handleLogout} className="nav-btn logout">Sair</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;