/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  await knex('users').insert([
    { username: 'cool_cat', password_hash: '1234', organization_id: 1 },
    { username: 'l33t-guy', password_hash: '1234', organization_id: 2 },
    { username: 'wowow', password_hash: '1234', organization_id: 3 },
  ]);
};
