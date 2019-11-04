const express = require('express');

// database access using knex, to talk to database
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    //res.send({message: 'Alive'})
    db.select('*').from('accounts') //all knex commands return a promise
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(error => {
        res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
    //select * from posts where id = req.params.id
    db.select('*').from('accounts').where('id', '=', req.params.id)
    .then(account => {
        res.status(200).json(account)
    }).catch(error => {
        res.status(500).json(error)
    })
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;