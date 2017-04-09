
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('full_name').notNullable();
    table.string('contact_number').notNullable();
    table.string('contact_email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
