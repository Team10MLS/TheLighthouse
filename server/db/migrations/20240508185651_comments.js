/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
  table.increments('id').primary();
  table.integer('post_id').unsigned().notNullable();
  table.foreign('post_id').references('id').inTable('posts');
  table.integer('user_id').unsigned().notNullable();
  table.foreign('user_id').references('id').inTable('users');
  table.string('body').notNullable();
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

