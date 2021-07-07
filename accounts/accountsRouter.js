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
    .first() //give you first item of array, only 1 item, cause 1 id
    .then(account => {
        res.status(200).json(account)
    }).catch(error => {
        res.status(500).json(error)
    })
});

router.post('/', (req, res) => {
    const postData = req.body;
    // {
    //     "name": "Wine",
    //     "budget": 556789
    //   }
    //validate the data before saving.
    //sqlite always get id back, need to include id
    db('accounts').insert(postData, 'id')
    .then(ids => {
        res.status(200).json(ids)
    }).catch(error => {
        res.status(500).json(error)
    })

});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    db('accounts')
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        res.status(200).json(count)
    }).catch(error => {
        res.status(500).json(error)
    })
});

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json(count)
    }).catch(error => {
        res.status(500).json(error)
    })
});

module.exports = router;