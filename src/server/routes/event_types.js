const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  console.log('am i in the .get of event_types');
  res.render('../views/event_types/event_types');
});

module.exports = router;
