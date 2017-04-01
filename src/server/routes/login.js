const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  console.log('in the log in.');
  renderObject = {};
  res.render('../views/login.html', renderObject);

  // function getAll(tableName) {return knex(tableName).select();}
  //
  // let getTypes = getAll('event_types');
  //
  // Promise.all([
  //   getTypes
  // ])
  // .then((results) => {
  //   const renderObject = {};
  //   renderObject.event_types = results[0];
  //   res.render('../views/event_types/event_types.html', renderObject);
  // });
});

router.post('/', function (req, res, next) {
  console.log('post: ', req.body);

  // knex('event_types')
  // .insert(
  //   {
  //     event_type: req.body.event_type_name,
  //     event_type_description: req.body.event_type_description
  //   })
  //   .then((data) => {
  //     res.send({
  //       redirect: '/event_types/event_types'
  //     });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
});

module.exports = router;
