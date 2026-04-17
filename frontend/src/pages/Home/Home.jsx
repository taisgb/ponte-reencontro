import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import "./Home.css";

const Home = () => {
    const [pessoas, setPessoas] = useState([]);


    useEffect(() => {
        const buscarDados = async () => {
            try {
                const response = await api.get('/desaparecidos');
                setPessoas(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do back-end", error);
            }
        };
        buscarDados();
    }, []);  

    return (
        <div className="home-container">
            <h2>Pessoas Desaparecidas</h2>
            <div className="pessoas-lista">
                {pessoas.length === 0 ? (
                    <p>Nenhum registro encontrado.</p>
                ) : (
                    pessoas.map((p) => (
                        <div key={p.id} className="pessoa-card">
                            {p.imagem_pessoa && (
                                <img src={p.imagem_pessoa} alt={p.nome} className="pessoa-imagem" />
                            )}
                            <h3>{p.nome}</h3>
                            <p><strong>Idade:</strong> {p.idade}</p>
                            <p><strong>Características:</strong> {p.caracteristicas}</p>
                            <p><strong>Data:</strong> {p.data_desaparecimento}</p>
                            <p><strong>Local:</strong> {p.local_desaparecimento}</p>
                            <Link to={`/perfil/${p.id}`} className="btn-comentar">Ver Perfil</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    ); 
};

export default Home;