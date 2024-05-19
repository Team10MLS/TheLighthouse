/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  const organization = await knex('organizations').select('id');
  const resource = await knex('resources').select('id')
  const users = await knex('users').select('id');

  await knex('posts').insert([
    { user_id : users[0].id,
      organization_id: organization[1].id,
      resource_id: resource[0].id,
      title: "Homeless awareness",
      body: "Posting about raising awareness for homelessness"
    },
    { user_id : users[1].id,
      organization_id: organization[1].id,
      resource_id: resource[3].id,
      title: "Drug Addiction",
      body: "Posting about raising awareness for drug abuse"
    },
    { user_id : users[2].id,
      organization_id: organization[3].id,
      resource_id: resource[5].id,
      title: "Impact The Newbies",
      body: "Raise awarness to the new generation and how we can sustain a healthy life for newbies"
    },
    { user_id : users[3].id,
      organization_id: organization[1].id,
      resource_id: resource[0].id,
      title: "Power Of THE BRAIN",
      body: "realization of what regenerates the brain cells cells are powerful, check this out ! "
    },
    { user_id : users[0].id,
      organization_id: organization[1].id,
      resource_id: resource[0].id,
      title: "Teen Pregnancy",
      body: "Teach your kids about prevention of pregnancy and protection control!"
    },
  ])
};
// table.increments('id').primary();
// table.integer('user_id').unsigned().references('id').inTable('users');
// table.integer('resource_id').unsigned().references('id').inTable('resources');
// table.string('title');
// table.string('body');
