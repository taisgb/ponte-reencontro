const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const criarBanco = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.get("PRAGMA foreign_keys = ON");

    // Tabela de usuários
    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    `);
        
    // Tabela de pessoas desaparecidas
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pessoas_desaparecidas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            idade INTEGER,
            caracteristicas TEXT,
            data_desaparecimento TEXT,
            local_desaparecimento TEXT,
            status TEXT DEFAULT 'Desaparecido',
            imagem_pessoa TEXT
        )
    `);

    // Tabela de comentários 
    await db.exec(`
        CREATE TABLE IF NOT EXISTS comentarios (  
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoa_id INTEGER,
            usuario_id INTEGER,
            mensagem TEXT NOT NULL,
            data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pessoa_id) REFERENCES pessoas_desaparecidas (id) ON DELETE CASCADE,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        )
    `);
    
    return db;
};

module.exports = { criarBanco };