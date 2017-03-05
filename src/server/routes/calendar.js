const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.post('/month/:id', function(req, res, next) {

  var month = parseInt(req.params.id);
  console.log('I\'m returning the month: ', month);

  // function getDays(tableName, monthNumber) {
  //   console.log('in getDays');
  //   var results = knex(tableName).whereRaw('month = ?', [monthNumber]).select('date');
  //   console.log('results: ', results);
  //   return results;
  // }

  function pullEvents(tableName){
    // return knex(tableName).whereRaw('month = ?', [monthNumber]).select('date', 'month', 'year')
    return knex(tableName).select();}

  let getDays = pullEvents('events');


  Promise.all([
    getDays
  ])
  .then((results) => {
    console.log('am I successful?');
    console.log('here are results', results[0]);

    function formatDate(date, index) {
      console.log('date is: ', date.date);
        if(date.date < 10){
          date.date = "0" + date.date.toString();
        } else {
          date.date = date.date.toString();
        }

        if(date.month < 10){
          date.month = "0" + date.month.toString();
        } else {
          date.month = date.month.toString();
        }
        var object = {};
        object.date = [date.year, date.month, date.date].join("-");
        return object;
    }

    const renderObject = {};
    renderObject.days = results[0].map(formatDate);

    console.log('days: ', renderObject.days);
    //renderObject.days = results[0];
    res.send(renderObject);
  });
});

router.get('/day/:id', function(req, res, next) {
  console.log('the day clicked is: ', req);

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

module.exports = router;
