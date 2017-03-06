exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments();
    table.integer('event_type_id').references('id').inTable('event_types');
    table.string('event_name');
    table.string('month');
    table.string('date');
    table.string('year');
    table.time('time_start');
    table.time('time_end');
    table.string('location_name');
    table.string('street');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.timestamp('date_created');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
