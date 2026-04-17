import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./PerfilDesaparecido.css";

const PerfilDesaparecido = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {  
    const carregarDados = async () => {
      try {
        const resPessoa = await api.get("/desaparecidos");
        const encontrada = resPessoa.data.find(p => p.id === parseInt(id));
        setPessoa(encontrada);

        const resComentarios = await api.get(`/desaparecidos/${id}/comentarios`);
        setComentarios(resComentarios.data);
      } catch (err) {
        console.error("Erro ao carregar perfil", err);
      }
    };
    carregarDados();
  }, [id]);

  const handleComentar = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    try {
      await api.post("/comentarios", { pessoa_id: id, mensagem: novoComentario });
      setNovoComentario("");
      
      const res = await api.get(`/desaparecidos/${id}/comentarios`);
      setComentarios(res.data);
    } catch (err) {
      alert("Erro ao postar comentário. Verifique se está logado.");
    }
  };

  if (!pessoa) return <div className="loading">Carregando perfil...</div>;

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img src={pessoa.imagem_pessoa} alt={pessoa.nome} className="perfil-foto" />
        <div className="perfil-info-topo">
          <h1>{pessoa.nome}</h1>
          <p className="tag-idade">{pessoa.idade} anos</p>
          <div className="detalhes-essenciais">
            <p><strong>Visto por último em:</strong> {pessoa.local_desaparecimento}</p>
            <p><strong>Data:</strong> {pessoa.data_desaparecimento}</p>
          </div>
        </div>
      </div>

      <div className="perfil-corpo">
        <section className="descricao-secao">
          <h3>Características e Descrição</h3>
          <p>{pessoa.caracteristicas}</p>
        </section>

        <section className="comentarios-secao">
          <h3>Pistas e Informações Recentes</h3>
          
          {token ? (
            <form onSubmit={handleComentar} className="form-comentario">
              <textarea 
                placeholder="Vi essa pessoa ou tenho uma pista..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                required
              />
              <button type="submit" className="btn-enviar-pista">Enviar Informação</button>
            </form>
          ) : (
            <p className="aviso-login">Faça login para enviar uma pista.</p>
          )}

          <div className="lista-comentarios">
            {comentarios.length > 0 ? comentarios.map(c => (
              <div key={c.id} className="comentario-card">
                <p className="comentario-autor"><strong>{c.autor}</strong> disse:</p>
                <p className="comentario-texto">{c.mensagem}</p>
              </div>
            )) : (
              <p className="sem-comentarios">Nenhuma pista registrada ainda.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerfilDesaparecido;