/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  const users = await knex('users').select('id');

  await knex('posts').insert([
    { 
      user_id : users[0].id,
      title: "In need of socks and underwear for my regulars",
      body: "Hello everyone, I am in need of socks and underwear for my regulars at my food bank. If anyone knows of a place I can direct them to for this, please send the information my way. Thank you!"
    },
    {
      user_id : users[1].id,
      title: "Need help with a food drive",
      body: "Hello everyone, I am looking for volunteers to help with a food drive I am organizing. If you are able to help, please let me know. Thank you!"
    },
    {
      user_id : users[4].id,
      title: "Looking for donations for our food pantry",
      body: "Hello everyone, we are looking for donations for our food pantry. If you are able to donate, please let us know. Thank you!"
    },
    {
      user_id: users[7].id,
      title: "Requesting information on free medical services in Brooklyn",
      body: "I run a shelter in East Brooklyn and am looking for information on free medical services in the area. If you have any information, please reach out to me at 347-876-1002 or my email at jameswilson72@gmail.com. Thank you!"
    }
  ]);
}