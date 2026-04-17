import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import NavBar from './components/NavBar/NavBar';
import CadastroDesaparecido from './pages/CadastroDesaparecido/CadastroDesaparecido';
import PerfilDesaparecido from './pages/PerfilDesaparecido/PerfilDesaparecido';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/cadastro" element={<Cadastro />} />
          

        {/* Rota protegida*/}
        <Route path="/cadastrar-desaparecido" element={<CadastroDesaparecido />} />

        <Route path="/perfil/:id" element={<PerfilDesaparecido />} />
        
       
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
