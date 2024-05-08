/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('resources', (table) => {
    table.increments();
    table.integer('organization_id').unsigned().notNullable();
    table.foreign('organization_id').references('id').inTable('organizations');
    table.string('category').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('resources');
};
