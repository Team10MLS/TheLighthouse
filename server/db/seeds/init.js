const User = require('../models/User');
const Organization = require('../models/Organization');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  const org1Id = await Organization.query().where('name', 'Organization 1').select('id').first();
  const org2Id = await Organization.query().where('name', 'Organization 2').select('id').first();

  await User.create('cool_cat', '1234', org1Id);
  await User.create('l33t-guy', '1234', org2Id);
  await User.create('wowow', '1234', org1Id);
};
