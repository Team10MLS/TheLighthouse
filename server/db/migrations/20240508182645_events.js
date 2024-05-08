/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

 
    // date timestamp
    // time timestamp
    
    // location string

    return knex.schema.createTable('events', (table) => {
        table.increments('id').primary()
        table.integer('organizations_id').unsigned().notNullable();
        table.foreign('organizations_id').references('id').inTable('organizations')
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('users')
        table.string('event')
        table.date('date')
        table.timestamp('time')
        table.string('location')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('events')
};
