exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('resources').del()
    await knex('resources').insert([
      {colName: 'value', otherColName: 'value'},
      {colName: 'value', otherColName: 'value'},
      {colName: 'value', otherColName: 'value'}
    ]);
  };