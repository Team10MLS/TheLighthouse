/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  table.increments('id').primary();
  table.integer('post_id').unsigned().notNullable();
  table.foreign('post_id').references('id').inTable('posts');
  table.integer('user_id').unsigned().notNullable();
  table.foreign('user_id').references('id').inTable('users');
  table.string('body').notNullable();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
