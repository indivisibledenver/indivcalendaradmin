const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {
  console.log('post: ', req.body);

  knex('events')
  .insert(
    {
      event_name: req.body.event_name
    })
    .then((data) => {
      res.send({
        redirect: '/index'
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/', function (req, res, next) {
  console.log('am i in the .get of events');
  res.render('../views/index.html');
});

module.exports = router;
