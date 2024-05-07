/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    // Table posts {
    //     id integer [primary key]
    //     user_id integer [ref: > users.id]
    //     resource_id integer [ref: > resources.id]
    //     comment_ids integer[]
    //     body string
    //   }

    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('resource_id').unsigned().references('id').inTable('resources');
        table.specificType('comment_ids', 'integer[]');
        table.string('body');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts');
};
