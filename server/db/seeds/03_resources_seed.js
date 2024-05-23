exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('resources').del();

  const organizations = await knex('organizations').select('id');

  await knex('resources').insert([
    { organization_id: organizations[0].id, category: 'food', name: 'Pantry Distribution', description: 'The Church of St. Nicholas of Toletine offers a pantry distribution every thursday and friday morning from 9 am to 12 pm. We are located at 2345 University Ave, Bronx, NY.' },
    { organization_id: organizations[1].id, category: 'Clothing', name: 'Sock and Underwear Distribution', description: 'We accept and distribute gently used clothing, shoes, and accessories. Located at 26 E 120th St, New York, NY. Contact Sarah Miller at sarahjohnson@example.com or +1 (555) 321-7890 for any questions you may have.' },
    { organization_id: organizations[3].id, category: 'Medical Services', name: 'Mobile Medical Unit', description: 'Our mobile medical unit provides free medical services to homeless individuals in New York City. We are located at 129 Fulton St, New York, NY.' },
    { organization_id: organizations[4].id, category: 'Shelter', name: 'Crisis Shelter', description: 'We provide emergency access to shelter and services for homeless youth in immediate need of temporary housing. Located at 550 10th Ave, New York, NY.' },
    { organization_id: organizations[6].id, category: 'Shelter',   name: 'Housing Works Bookstore Cafe and Thrift Stores',   description: 'Housing Works Bookstore Cafe and its thrift stores put proceeds toward support services for homeless people living with HIV/AIDS. You can help by shopping there ,donating or volunteering! Located at our main branch on 126 Crosby St in Manhattan.' },
    { organization_id: organizations[8].id, category: 'Shelter', name: 'BronxWorks Homeless Outreach Team', description: 'Our Homeless Outreach Team provides services to homeless individuals in the Bronx. We are located at 60 E Tremont Ave, Bronx, NY.' },
    { organization_id: organizations[2].id, category: 'Medical Services', name: 'Harm reduction services available.', description: 'We provide no questions asked supplies and relevant resources for the purpose of facilitating harm reduction in our community. Located at 90 Lafayette Street, 6th Floor, New York, NY.' },
    { organization_id: organizations[5].id, category: 'Support Groups', name: 'Teen Support Groups', description: 'Covenant House offers group sessions for teens experiencing homelessness Monday-Friday at 5 pm.' },
    { organization_id: organizations[7].id, category: 'Shelter', name: 'GiveBack Foundation', description: 'Raises funds for providing education to underprivileged children.' },
  ]);
};
