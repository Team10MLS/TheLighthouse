/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const User = require('../models/User');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  await Promise.all([
    User.create('cool_cat', '1234', 1),
    User.create('l33t-guy', '1234', 2),
    User.create('wowow', '1234', 3),
  ]);
};
