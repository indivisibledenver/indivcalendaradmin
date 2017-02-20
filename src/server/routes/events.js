const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {
  console.log('post: ', req.body);

  var date_created = '12:34:56';

  knex('events')
  .insert(
    {
      event_name: req.body.event_name,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      location_name: req.body.location_name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      description: req.body.description

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

  function getAll(tableName) {return knex(tableName).select();}

  let getEvents = getAll('events');

  Promise.all([
    getEvents
  ])
  .then((results) => {
    console.log('here in the results of events: ', results);
    const renderObject = {};
    renderObject.events = results[0];
    // renderObject.events = results[0].map(function(el) {
    //   el.start_time = el.start_time.replace(':', '');
    //   return el;
    // });
    console.log('here is the renderObject', results);
    res.render('../views/index.html', renderObject);
  });
});

module.exports = router;
