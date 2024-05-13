exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('resources').del();

  const organizations = await knex('organizations').select('id');

  await knex('resources').insert([
    { organization_id: organizations[0].id, category: 'food', name: 'FoodUniteBank', description: 'Provides shelter for homeless individuals. Located at 123 Main Street, Anytown, USA. Contact John Doe at johndoe@example.com or +1 (555) 123-4567.' },
    { organization_id: organizations[1].id, category: 'Clothing', name: 'Threads of Hope', description: 'Accepts and distributes gently used clothing, shoes, and accessories. Located at 789 Elm Street, Anystate, USA. Contact Sarah Johnson at sarahjohnson@example.com or +1 (555) 321-7890.' },
    { organization_id: organizations[2].id, category: 'Medical Services', name: 'HealthCare Clinic', description: 'Provides general checkups, vaccinations, and minor treatments. Located at 101 Maple Avenue, Anyvillage, USA. Contact Dr. Michael Lee at mlee@example.com or +1 (555) 456-7890.' },
    { organization_id: organizations[3].id, category: 'Support Groups', name: 'Mental Health Support Circle', description: 'Offers support for mental health issues. Virtual meetings held every Tuesday and Thursday at 7pm. Contact Maria Rodriguez at maria.rodriguez@example.com or +1 (555) 789-0123.' },
    { organization_id: organizations[4].id, category: 'Donation', name: 'GiveBack Foundation', description: 'Raises funds for providing education to underprivileged children.' },
  ]);
};
