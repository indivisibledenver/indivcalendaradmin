const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.post('/month/:id', function(req, res, next) {

  var month = parseInt(req.params.id);
  console.log('I\'m returning the month: ', month);

  function pullEvents(tableName){return knex(tableName).select('*');}

  let getDays = pullEvents('events');

  Promise.all([
    getDays
  ])
  .then((results) => {
    function formatDate(date, index) {
      console.log('date is: ', date.day);
      console.log('the date obj is: ', date)
        if(date.day < 10){
          date.day = date.day.toString();
        } else {
          date.day = date.day.toString();
        }

        if(date.month < 10){
          date.month = date.month.toString();
        } else {
          date.month = date.month.toString();
        }
        var object = {};
        object.date = [date.year, date.month, date.day].join("-");
        object.event_title = date.event_name;
        return object;
    }

    console.log('results in calendar: ', results[0]);
    const renderObject = {};
    renderObject.days = results[0].map(formatDate);
    console.log('here is renderObj thingy: ', renderObject);

    res.send(renderObject);
  });
});

router.get('/day/:id', function(req, res, next) {
  console.log('the day clicked is: ', req);

  function getAll(tableName) {return knex(tableName).select();}

  let getEvents = getAll('events');

  Promise.all([
    getEvents
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];
    res.render('../views/index.html', renderObject);
  });

});

router.get('/', function (req, res, next) {
  console.log('i am in the .get of calendar!!!!');

  function getAll(tableName) {return knex(tableName).select();}

  let getEvents = getAll('events');

  Promise.all([
    getEvents
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.events = results[0];
    console.log('here are the results from / calendar: ', renderObject.events);
    res.render('../views/calendar/calendar.html', renderObject);
  });
});

module.exports = router;
