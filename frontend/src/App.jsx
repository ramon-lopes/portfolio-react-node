import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estados para dados da API
  const [perfil, setPerfil] = useState({});
  const [projetos, setProjetos] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formacao, setFormacao] = useState([]); // NOVO ESTADO
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ESTADOS PARA O FORMULÁRIO DE CONTATO
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

  // FUNÇÃO PARA BUSCAR DADOS DA API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chamadas paralelas para buscar todos os dados
        const [perfilRes, projetosRes, skillsRes, formacaoRes] =
          await Promise.all([
            fetch("http://localhost:3000/api/perfil"),
            fetch("http://localhost:3000/api/projetos"),
            fetch("http://localhost:3000/api/skills"),
            fetch("http://localhost:3000/api/formacao"),
          ]);

        if (
          !perfilRes.ok ||
          !projetosRes.ok ||
          !skillsRes.ok ||
          !formacaoRes.ok // Verifica o novo endpoint
        ) {
          throw new Error(
            "Falha ao buscar dados na API. Verifique se o Back-end está rodando na porta 3000."
          );
        }

        // Processa as respostas
        setPerfil(await perfilRes.json());
        setProjetos(await projetosRes.json());
        setSkills(await skillsRes.json());
        setFormacao(await formacaoRes.json()); // Define o estado da formação
      } catch (e) {
        console.error("Erro na comunicação com a API:", e);
        setError(
          e.message ||
            "Não foi possível conectar ao servidor. Verifique o Terminal 1."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FUNÇÃO PARA ATUALIZAR O ESTADO DOS INPUTS DO FORMULÁRIO
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FUNÇÃO PARA ENVIAR O FORMULÁRIO (Requisição POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:3000/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Falha ao enviar a mensagem. Verifique a consola."
        );
      }

      setStatusMessage({
        type: "success",
        message: "✅ Mensagem enviada com sucesso! Obrigado pelo contato.",
      });
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch (err) {
      console.error("Erro no envio do formulário:", err);
      setStatusMessage({
        type: "error",
        message:
          err.message || "❌ Erro de comunicação. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Tela de Erro ou Carregamento
  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{ textAlign: "center", padding: "100px" }}
      >
        Carregando Conteúdo...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="error-screen"
        style={{ textAlign: "center", padding: "100px", color: "red" }}
      >
        <h2>❌ Erro de Conexão com o Back-end</h2>
        <p>{error}</p>
        <p>
          Por favor, certifique-se de que o Terminal 1 está rodando `node
          server.js` e a porta 3000 está livre.
        </p>
      </div>
    );
  }

  // 2. Renderização do Portfólio
  return (
    <div className="meu-portfolio">
      {/* Seção 1: Perfil */}
      <header>
        <div className="profile-image-container">
          <img 
            src="/assets/profile.jpg" 
            alt="Sua Foto de Perfil" />
        </div>

        <h1>{perfil.nome}</h1>
        <h2>{perfil.titulo}</h2>
        <p>{perfil.bio}</p>
        <nav>
          {perfil.links.github && (
            <a
              href={perfil.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {perfil.links.linkedin && <span style={{ margin: "0 10px" }}>|</span>}
          {perfil.links.linkedin && (
            <a
              href={perfil.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
        </nav>
      </header>
      <hr />
      {/* Seção 2: Projetos */}
      <section id="projetos">
        <h3>🚀 Meus Projetos ({projetos.length} no total)</h3>
        <div className="lista-projetos">
          {projetos.map((p) => (
            <div key={p.id} className="card-projeto">
              <h4>{p.titulo}</h4>
              <p>{p.descricao}</p>
              <p>
                Tecnologias: <strong>{p.tecnologias.join(", ")}</strong>
              </p>
              <a href={p.linkRepo} target="_blank" rel="noopener noreferrer">
                Ver Repositório
              </a>
            </div>
          ))}
        </div>
      </section>
      <hr />
      {/* Seção 3: Skills */}
      <section id="skills">
        <h3>🛠️ Habilidades Técnicas</h3>
        {skills.map((s, index) => (
          <div key={index}>
            <h4>{s.categoria}</h4>
            <div className="skill-list">
              {s.lista.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
      <hr />
      {/* Seção 4: Formação Acadêmica */}
      <section id="formacao">
        <h3>🎓 Formação Acadêmica</h3>
        <div className="lista-formacao">
          {formacao.map((item, index) => (
            <div key={index} className="card-formacao">
              <h4>{item.curso}</h4>
              <p>
                <strong>Instituição:</strong> {item.instituicao}
              </p>
              <p>
                <strong>Período:</strong> {item.periodo}
              </p>
              <p className="descricao-formacao">{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>
      <hr />
      {/* Seção 5: Contato */}
      <section id="contato">
        <h3>📧 Entre em Contato</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Seu Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Seu Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          </button>

          {/* Feedback de Status */}
          {statusMessage.message && (
            <div className={`status-message status-${statusMessage.type}`}>
              {statusMessage.message}
            </div>
          )}
        </form>
      </section>

      <footer>
        &copy; {new Date().getFullYear()} {perfil.nome}
      </footer>
    </div>
  );
}

export default App;
