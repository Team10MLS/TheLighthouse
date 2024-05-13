/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organizations', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  })
    .createTable('users', (table) => {
      table.increments();
      table.string('username').notNullable().unique();
      table.string('password_hash').notNullable();
      table.integer('organization_id').unsigned().nullable();
      table.foreign('organization_id').references('id').inTable('organizations');
    });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('users').dropTable('organizations');
};
