
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_types', function(table) {
    table.increments();
    table.string('event_type').notNullable();
    table.string('event_type_description').notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('event_types');
  };
