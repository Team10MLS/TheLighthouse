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
      title: "Homeless awareness",
      body: "Posting about raising awareness for homelessness"
    },
    { 
      user_id : users[1].id,
      title: "Drug Addiction",
      body: "Posting about raising awareness for drug abuse"
    },
    { 
      user_id : users[2].id,
      title: "Impact The Newbies",
      body: "Raise awarness to the new generation and how we can sustain a healthy life for newbies"
    },
    { 
      user_id : users[2].id,
      title: "Power Of THE BRAIN",
      body: "realization of what regenerates the brain cells cells are powerful, check this out ! "
    },
    { 
      user_id : users[0].id,
      title: "Teen Pregnancy",
      body: "Teach your kids about prevention of pregnancy and protection control!"
    },
  ]);
}