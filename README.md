# Ponte de Reencontro 🤝

O **Ponte de Reencontro** é uma plataforma dedicada a auxiliar na localização de pessoas desaparecidas, conectando famílias e colaboradores. O projeto permite o registro de informações detalhadas sobre desaparecidos e possibilita que usuários cadastrados contribuam com pistas através de comentários em tempo real. Projeto final full stack da vai na web.

## 🚀 Funcionalidades

* **Gestão de Usuários:** Cadastro e login seguro utilizando criptografia de senhas.
* **Registro de Desaparecidos:** Cadastro detalhado com nome, idade, características físicas, local e data do desaparecimento.
* **Comentários Colaborativos:** Sistema de pistas para usuários logados.
* **Segurança:** Proteção de rotas sensíveis utilizando autenticação por Token (JWT).

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Node.js & Express**: Servidor e gerenciamento de rotas.
* **SQLite3**: Banco de dados relacional leve.
* **JWT (JSON Web Token)**: Autenticação segura.
* **Bcryptjs**: Criptografia de senhas.
* **Dotenv**: Variáveis de ambiente.

### **Frontend**
* **React.js**: Interface do usuário.
* **Axios**: Consumo da API.
* **React Router Dom**: Navegação entre páginas.


## 📌 Rotas da API
| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| **POST** | `/usuarios/cadastro` | Cria um novo usuário | Público |
| **POST** | `/usuarios/login` | Autentica e gera o Token JWT | Público |
| **GET** | `/desaparecidos` | Lista todas as pessoas registradas | Público |
| **POST** | `/desaparecidos` | Registra uma nova pessoa desaparecida | **Privado (Token)** |
| **GET** | `/desaparecidos/:id/comentarios` | Busca comentários de um registro específico | Público |
| **POST** | `/comentarios` | Envia um novo comentário ou pista | **Privado (Token)** |