/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('organizations').del()
  await knex('organizations').insert([
    {name: 'Community Kitchen of West Harlem'},
    {name: 'Grace Church in New York'},
    {name: 'East River Shelter'},
    {name: 'Coat Drive'},
    {name: 'Soup Kitchen'}
  ])
};
