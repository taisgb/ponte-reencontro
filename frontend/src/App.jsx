import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
