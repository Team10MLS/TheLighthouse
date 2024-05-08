exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del();

  const organizations = await knex('organizations').select('id');
  const users = await knex('users').select('id');

  await knex('events').insert([
    { 
      organizations_id: organizations[0].id, 
      user_id: users[0].id, 
      event: 'Coat Drive', 
      event_time: knex.raw('timestamp \'2022-12-01 15:00:00\''),
      location: '123 Main Street, Anytown, USA' 
    },
    { 
      organizations_id: organizations[1].id, 
      user_id: users[1].id, 
      event: 'Food Giveaway', 
      event_time: knex.raw('timestamp \'2024-11-15 12:00:00\''), 
      location: '789 Elm Street, Anystate, USA' 
    },
    {
      organizations_id: organizations[2].id,
      user_id: users[2].id,
      event: 'Fundraiser',
      event_time: knex.raw('timestamp \'2024-10-01 18:00:00\''),
      location: '456 Oak Street, Anycity, USA'
    }
  ]);
};