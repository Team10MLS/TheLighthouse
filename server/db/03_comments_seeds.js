/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del();

  const posts = await knex('posts').select('id');

  await knex('comments').insert([
    { user_id: 1, post_id: posts[0].id, body: 'This resource is awesome! saved my life' },
    { user_id: 2, post_id: posts[1].id, body: 'Absolutely trash, adddress took me to the middle of nowhere' },
    { user_id: 3, post_id: posts[2].id, body: 'Great Food at this food bank' },
  ]);
};
