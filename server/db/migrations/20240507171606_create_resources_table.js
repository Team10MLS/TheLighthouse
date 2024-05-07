/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // Table resources {
  //   id integer [primary key]
  //   organization_id integer [ref: > organizations.id]
  //   category_id integer [ref: > categories.id]
  //   name string
  //   description string
  // }
  return knex.schema.createTable('resources', (table) => {
    table.increments();
    table.integer('organization_id').unsigned().notNullable();
    table.foreign('organization_id').references('id').inTable('organizations');
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('id').inTable('categories');
    table.string('name').notNullable();
    table.string('description').notNullable();
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('resources');
};
