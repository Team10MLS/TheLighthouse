/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del();

  const posts = await knex('posts').select('id');
  const users = await knex('users').select('id');

  await knex('comments').insert([
    { post_id: posts[0].id, user_id: users[1].id, body: "The Bowery Mission often has clothing drives. You might want to check with them." },
    { post_id: posts[0].id, user_id: users[2].id, body: "I've seen socks and underwear at the Housing Works Thrift Shop on 130 Crosby St, New York, NY 10012." },
    { post_id: posts[1].id, user_id: users[3].id, body: "I'd love to help! When and where is the food drive?" },
    { post_id: posts[1].id, user_id: users[4].id, body: "I can volunteer this weekend. Please let me know the details." },
    { post_id: posts[2].id, user_id: users[5].id, body: "I have some canned goods I can donate. Where can I drop them off?" },
    { post_id: posts[2].id, user_id: users[6].id, body: "I can donate some fresh produce from my garden. Let me know if you're interested." },
    { post_id: posts[3].id, user_id: users[7].id, body: "The Beth Hark Christian Counseling Center offers free medical services. They're located at 2 W 120th St, New York, NY 10027." },
    { post_id: posts[3].id, user_id: users[8].id, body: "You should check out the Coalition for the Homeless. They have a list of free medical services in Brooklyn." }
  ]);
};