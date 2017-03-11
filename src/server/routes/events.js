const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {
  console.log('post: ', req.body);

  var date_created = '12:34';
  var date_month = req.body.date.slice(5,7);
  var date_day = req.body.date.slice(8,10);
  var date_year = req.body.date.slice(0,4);

  console.log('day: ', date_day);
  console.log('month: ', date_month);
  console.log('year: ', date_year);

  knex('events')
  .insert(
    {
      event_name: req.body.event_name,
      month: date_month,
      date: date_day,
      year: date_year,
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

function getFormattedDate(date_string) {
  console.log('here is the unformatted date: ', date_string);
  var date_object = {};
  date_object.year = date_string.slice(0,4);
  date_object.month = date_string.slice(5,7);
  date_object.day = date_string.slice(8,10);
  return date_object;
}

router.get('/day/:id', function (req, res, next) {
  console.log('.get of events for day');

  var dateObj = getFormattedDate(req.params.id);

  console.log('here is the date object: ', dateObj);

  function getAllEventsByDay(tableName) {return knex(tableName)
  .where({
  year: dateObj.year,
  month: dateObj.month,
  date: dateObj.day
  })
  .select('event_name', 'month', 'date', 'year', 'time_start', 'time_end','location_name', 'street', 'city', 'description');}
  //
  let getEventsForDay = getAllEventsByDay('events');

  Promise.all([
    getEventsForDay
  ])
  .then((results) => {
    console.log('you are in the results: ', results);
    const renderObject = {};
    renderObject.events = results[0];
    res.send(renderObject);
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
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

module.exports = router;
