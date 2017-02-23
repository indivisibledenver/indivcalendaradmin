const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {
  console.log('post: ', req.body);

  var date_created = '12:34';

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
      description: req.body.description,
      event_type_id: req.body.event_type_id
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
  let getTypes = getAll('event_types');

  Promise.all([
    getEvents,
    getTypes
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];
    renderObject.types = results[1];
    res.render('../views/index.html', renderObject);
  });
});

router.get('/delete/:id', function (req, res, next) {

  const id = parseInt(req.params.id);
  console.log('the id to delete is: ', id);
  knex('events')
  .del()
  .where('id', id)
  .returning('*')
  .then(() => {
    console.log('delete!');
    res.render('../views/index.html');
    // res.send({
    //   redirect: '/index'
    // });
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

module.exports = router;
