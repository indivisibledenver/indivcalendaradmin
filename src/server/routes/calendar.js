const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  console.log('i am in the .get of calendar');

  function getAll(tableName) {return knex(tableName).select();}

  let getEvents = getAll('events');

  Promise.all([
    getEvents
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];
    res.render('../views/calendar/calendar.html', renderObject);
  });
});

router.get('/day/:id', function(req, res, next) {
  console.log('the day clicked is: ', req.body);
  //function getAll(tableName) {return knex(tableName).select();}

  function getAll(tableName) {return knex(tableName).select();}

  let getEvents = getAll('events');
  //
  // Promise.all([
  //   getEvents
  // ])
  // .then((results) => {
  //   const renderObject = {};
  //   renderObject.events = results[0];
  //   res.render('../views/index.html', renderObject);
  // });

});

module.exports = router;
