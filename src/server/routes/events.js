const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', (req, res, next) => {


  var date_created = '12:34';
  var date_month = req.body.date.slice(5,7);
  var date_day = req.body.date.slice(8,10);
  var date_year = req.body.date.slice(0,4);

  function getEventsByDescription(tableName) {return knex(tableName).where('event_type_description', req.body.event_type_id).select('id');}

  let getEventDescrip = getEventsByDescription('event_types');


  Promise.all([
    getEventDescrip
  ]).then((results) => {
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
      event_type_id: results.id,
      url: req.body.url
    })
    .then((data) => {
      res.send({
        redirect: '/events'
      });
    })
    .catch((err) => {
      // console.error('this erred': err);
      console.log('the thing is in error: ', err);
    });
  });
});

router.get('/', function (req, res, next) {

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

    for(var x = 0; x < results[0].length; x++) {
      renderObject.events[x].time_start = setFormattedTime(renderObject.events[x].time_start);
      renderObject.events[x].time_end = setFormattedTime(renderObject.events[x].time_end);
    }

    renderObject.types = results[1];
    res.render('../views/events/event.html', renderObject);
  });
});

function getFormattedDate(date_string) {
  var date_object = {};
  date_object.year = date_string.slice(0,4);
  date_object.month = date_string.slice(5,7);
  date_object.day = date_string.slice(8,10);
  return date_object;
}

function setFormattedTime(hours) {

  //assume that you're sending in hours and minutes - e.g. 19:30 or 02:00
  //take the input hours, parseInt removes anything that's not a number and sends you what it can....17:00:00 is '17'
  var suffix = parseInt(hours) >= 12 ? "pm":"am";

  //take military time and put it to civilian time for the hours
  var time_hours = ((parseInt(hours) + 11) % 12 + 1);

  //pull out the minutes using substring from the input....
  var time_minutes = hours.substring(3, 5);

  //blend all that together and return....
  var time_string = time_hours.toString() + ':' + time_minutes + suffix;

  return time_string;
}

router.get('/day/:id', function (req, res, next) {

  var dateObj = getFormattedDate(req.params.id);

  function getAllEventsByDay(tableName) {return knex(tableName)
  .where({
  year: dateObj.year,
  month: dateObj.month,
  day: dateObj.day
  })
  .select('event_name', 'month', 'date', 'year', 'time_start', 'time_end','location_name', 'street', 'city', 'description', 'url');}

  let getEventsForDay = getAllEventsByDay('events');

  Promise.all([
    getEventsForDay
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];

    //set for loop based on results.length
    //can you use 'map' for this instead - would be quicker maybe?

    for(var x = 0; x < results[0].length; x++) {
      renderObject.events[x].time_start = setFormattedTime(renderObject.events[x].time_start);
      renderObject.events[x].time_end = setFormattedTime(renderObject.events[x].time_end);
    }

    res.send(renderObject);
  });
});

router.get('/delete/:id', function (req, res, next) {

  const id = parseInt(req.params.id);

  knex('events')
  .del()
  .where('id', id)
  .returning('*')
  .then(() => {
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
    const renderObject = {};
    renderObject.events = results[0];
    renderObject.types = results[1];
    res.render('../views/meetings/updateEvent.html', renderObject);
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

module.exports = router;
