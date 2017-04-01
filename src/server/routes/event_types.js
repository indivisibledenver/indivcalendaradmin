const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {

  function getAll(tableName) {return knex(tableName).select();}

  let getTypes = getAll('event_types');

  Promise.all([
    getTypes
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.event_types = results[0];
    res.render('../views/event_types/event_types.html', renderObject);
  });
});

router.post('/', function (req, res, next) {

  knex('event_types')
  .insert(
    {
      event_type: req.body.event_type_name,
      event_type_description: req.body.event_type_description
    })
    .then((data) => {
      res.send({
        redirect: '/event_types/event_types'
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/delete/:id', function (req, res, next) {

  const id = parseInt(req.params.id);
  console.log('the id to delete is: ', id);
  knex('event_types')
  .del()
  .where('id', id)
  .returning('*')
  .then(() => {
    console.log('delete from event types!');
    res.render('../views/event_types/event_types.html');
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
