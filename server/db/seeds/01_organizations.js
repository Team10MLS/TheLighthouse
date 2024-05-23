/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('resources').del();
  await knex('events').del();
  await knex('users').del();
  await knex('organizations').del();

  await knex.raw('ALTER SEQUENCE organizations_id_seq RESTART WITH 1');

  await knex('organizations').insert([
    { name: 'Church of St. Nicholas of Toletine' },
    { name: 'Beth Hark Christian Counseling Center' },
    { name: 'The Bowery Mission' },
    { name: 'Coalition for the Homeless' },
    { name: 'Covenant House' },
    { name: 'The Doe Fund' },
    { name: 'Housing Works' },
    { name: 'Women in Need' },
    { name: 'BronxWorks' }
  ]);
};
