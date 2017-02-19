exports.up = function(knex, Promise) {
  return knex.schema.createTable('links', function(table) {
    table.increments();
    table.integer('event_id').references('id').inTable('events');
    table.string('link_description').notNullable();
    table.string('url').notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('links');
  };
