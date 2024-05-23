/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const User = require('../models/User');

exports.seed = async function (knex) {
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  await Promise.all([
    User.create('john_doe', '1234', 1),
    User.create('jane_smith', '1234', 7),
    User.create('robert_johnson', '1234', 5),
    User.create('sarah_miller', '1234', 2),
    User.create('michael_brown', '1234', 3),
    User.create('linda_white', '1234', 8),
    User.create('james_wilson', '1234', 9),
    User.create('patricia_jones', '1234', 4),
    User.create('jennifer_davis', '1234', 6),
    User.create('william_garcia', '1234', 7),
  ]);
};