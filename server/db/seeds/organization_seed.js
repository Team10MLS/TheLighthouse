/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('organizations').del()
  await knex('organizations').insert([
    {name: 'Soup Kitchen'},
    {name: 'Coat Drive'},
    {name: 'Care for the Homeless'},
    {name: 'Grace Church in New York'},
    {name: 'East River Shelter'},
  ])
};
