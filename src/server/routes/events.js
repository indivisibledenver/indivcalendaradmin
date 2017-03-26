const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {

  console.log('here is the req.body: ', req.body);

  var date_created = '12:34';
  var date_month = req.body.date.slice(5,7);
  var date_day = req.body.date.slice(8,10);
  var date_year = req.body.date.slice(0,4);
  console.log('here is the date: ', req.body.date);

  function getEventsByDescription(tableName) {return knex(tableName).where('event_type_description', req.body.event_type_id).select('id');}

  let getEventDescrip = getEventsByDescription('event_types');

  console.log('here is the sql: ', getEventDescrip);

  Promise.all([
    getEventDescrip
  ]).then((results) => {
    console.log('results in description: ', results);
  knex('events')
  .insert(
    {
      event_name: req.body.event_name,
      month: date_month,
      day: date_day,
      year: date_year,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      location_name: req.body.location_name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      description: req.body.description,
      event_type_id: results.id
    })
    .then((data) => {
      res.send({
        redirect: '/index'
      });
    })
    .catch((err) => {
      // console.error('this erred': err);
      console.log('the thing is in error');
    });
  });
});

router.get('/', function (req, res, next) {
  console.log('am i in the .get of events');

  function getEventsOrdered(tableName) {return knex(tableName).select('*').orderBy('date');}

  function getAll(tableName) {return knex(tableName).select();}
  function onlyDate(dateArray) {dateArray.map(dateArray.slice(0,11));}
  let getEvents = getEventsOrdered('events');
  let getTypes = getAll('event_types');

  Promise.all([
    getEvents,
    getTypes
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];
    renderObject.types = results[1];
    console.log('events: ', results[0]);
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
  day: dateObj.day
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
    res.send('1');
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

router.get('/update/:id', function (req, res, next) {

  const id = parseInt(req.params.id);
  function getAll(tableName) {return knex(tableName).select();}

  function getEvent(event_id) {return knex('events')
    .where('id', event_id)
    .select('*');}

  let getEventRecord = getEvent(id);
  let getTypes = getAll('event_types');

  Promise.all([
    getEventRecord,
    getTypes
  ])
  .then((results) => {
    console.log('update: ', results);
    const renderObject = {};
    renderObject.events = results[0];
    renderObject.types = results[1];
    console.log('event: ', renderObject.events);
    res.render('../views/meetings/updateEvent.html', renderObject);
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

module.exports = router;
