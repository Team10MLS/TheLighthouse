exports.seed = async function (knex) {
  // Deletes all existing entries
  await knex('events').del();

  // Fetch organization and user IDs to use in the seed
  const organizations = await knex('organizations').select('id');
  const users = await knex('users').select('id');

  await knex('events').insert([
    { organization_id: organizations[0].id, user_id: users[0].id, event: 'Charity Auction', date: '2024-05-15', time: '10:00:00', location: '123 Main Street' },
    { organization_id: organizations[1].id, user_id: users[1].id, event: 'Food Drive', date: '2024-06-01', time: '14:00:00', location: '456 Elm Street' },
    { organization_id: organizations[2].id, user_id: users[2].id, event: 'Community Cleanup', date: '2024-07-10', time: '09:00:00', location: '789 Oak Avenue' },
    { organization_id: organizations[3].id, user_id: users[0].id, event: 'Fundraising Gala', date: '2024-08-20', time: '18:30:00', location: '101 Pine Street' },
    { organization_id: organizations[4].id, user_id: users[1].id, event: 'Volunteer Orientation', date: '2024-09-05', time: '12:00:00', location: '321 Maple Road' },
  ]);
};

