const express = require('express');

const db = require('./data/dbConfig.js');

const AccountsRouter = require('./accounts/accountsRouter')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter)

server.get('/', (req, res) => {
    res.send('<h3>DB up</h3>')
})

module.exports = server;