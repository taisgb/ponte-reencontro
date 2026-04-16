const express = require('express');
const cors = require('cors');
const {criarBanco} = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor do Ponte de Reencontro rodando com sucesso!');
});

// Rotas de usuários (login e cadastro)

//Cadastro de usuário
app.post('/usuarios/cadastro', async (req, res) => {
    const {nome, email, senha} = req.body;
    const db = await criarBanco();

    //Segurança: hash da senha
    const senhaCripto = await bcrypt.hash(senha, 10);

    try {
        await db.run(`
            INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)
            `, [nome, email, senhaCripto]
        );
        res.json({message: 'Usuário cadastrado com sucesso'});
    } catch (error) {
        res.status(400).json({error: 'Erro ao cadastrar usuário: ' + error.message});
    }
});

//Login usuário
app.post('/usuarios/login', async (req, res) => {
    const {email, senha} = req.body;
    const db = await criarBanco();

    const usuario = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
        const token = jwt.sign({id: usuario.id, nome: usuario.nome}, SECRET_KEY, {expiresIn: '24h'});
        res.json({message: 'Login bem-sucedido', token});
    }
    res.status(401).json({error: 'Email ou senha inválidos'});

});

//Rotas para pessoas desaparecidas
//Ler todas as pessoas desaparecidas
app.get('/desaparecidos', async (req, res) => {
    const db = await criarBanco();
    const pessoasDesaparecidas = await db.all('SELECT * FROM pessoas_desaparecidas');
    res.json(pessoasDesaparecidas);
})

//Cadastrar pessoa desaparecida
app.post('/desaparecidos', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({error: 'Faça login para cadastrar uma pessoa desaparecida'});

    try {
        jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        const {nome, idade, caracteristicas, data_desaparecimento, local_desaparecimento, imagem_pessoa} = req.body;
        const db = await criarBanco();

        await db.run(`
            INSERT INTO pessoas_desaparecidas (nome, idade, caracteristicas, data_desaparecimento, local_desaparecimento, imagem_pessoa) VALUES (?, ?, ?, ?, ?, ?)
            `, [nome, idade, caracteristicas, data_desaparecimento, local_desaparecimento, imagem_pessoa]);
        res.json({message: 'Pessoa desaparecida cadastrada com sucesso'});
    } catch (error) {
        res.status(400).json({error: 'Erro ao cadastrar pessoa desaparecida: ' + error.message});
    }
});

//Rota para comentários

//Listar comentários de uma pessoa desaparecida
app.get('/desaparecidos/:id/comentarios', async (req, res) => {
    const {id} = req.params;
    const db = await criarBanco();


const comentarios = await db.all(`
        SELECT c.*, u.nome as autor 
        FROM comentarios c 
        JOIN usuarios u ON c.usuario_id = u.id 
        WHERE c.pessoa_id = ?`, 
        [id]
    );
    res.json(comentarios);
});

//Postar comentário em uma pessoa desaparecida - somente logado
app.post('/comentarios', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({error: 'Faça login para postar um comentário'});

    try {
        const dadosToken = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        const {pessoa_id, mensagem} = req.body;
        const db = await criarBanco();

        await db.run(
        `INSERT INTO comentarios (pessoa_id, usuario_id, mensagem) VALUES (?, ?, ?)`, [pessoa_id, dadosToken.id, mensagem]
        );

        res.json({message: 'Comentário postado com sucesso'});

    } catch (error) {
        res.status(400).json({error: 'Erro ao postar comentário: ' + error.message});
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})
