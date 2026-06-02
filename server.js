const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

//Configurações do Servidor
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json()); //Necessário para o carrinho de compras (JSON)
app.use(express.static('.')); // Server seus arquivos HTML, CSS e imagens

// Conexão com o Banco de Dados
const db = new sqlite3.Database('./sissenai.db');

// Inicialização das tabelas (Cria apenas se não existirem)
db.serialize(() => {
// Tabela de Clientes
db.run(`CREATE TABLE IF NOT EXISTS clientes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
cpf TEXT
telefone TEXT
)`);




// --- RODAS DE CLIENTES---
app.post('/salvar-clientes', (req, res) => {
const { nome, cpf, telefone } =  req.body;
db.run(`INSERT INTO clientes (nome, cpf, telefone) VALUE(?, ?, ?)`,[nome,cpf,telefone],(err) => {
  if (err) return res.status(500).send(err.message);
  res.redirect('/clientes.html');
  });
});

  app.get('/lista-clientes', (req, res) => {
    dp.all("SELECT * FROM clientes", [], (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    });
  });



  
  // Iniciar Servidor
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`SISSENAI RODADO EM: https://localhost:${PORT}`);
    console.log(`=========================================`);
  });
