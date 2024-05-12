const knex = require('../knex');

// exports.up = function (knex) {
//   return knex.schema.createTable('events', (table) => {
//     table.increments('id').primary();
//     table.integer('organizations_id').unsigned().notNullable();
//     table.foreign('organizations_id').references('id').inTable('organizations');
//     table.integer('user_id').unsigned().notNullable();
//     table.foreign('user_id').references('id').inTable('users');
//     table.string('event');
//     table.timestamp('event_time');
//     table.string('location');
//   }); Based on this schema

class Events {
  constructor({ id, organizations_id, user_id, event, event_time, location }) {
    this.id = id;
    this.organizations_id = organizations_id;
    this.user_id = user_id;
    this.event = event;
    this.event_time = event_time;
    this.location = location;
  }

  static async create({ organizations_id, user_id, event, event_time, location }) {
    const query = `INSERT INTO events (organizations_id, user_id, event, event_time, location) VALUES (?,?,?,?,?) RETURNING *`;

    const { rows } = await knex.raw(query, [organizations_id, user_id, event, event_time, location]);
    const event = rows[0];
    return new Events(event);
  }

  static async delete({ organizations_id, user_id }) {
    const query = `DELETE FROM events WHERE organizations_id = ? AND user_id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [organizations_id, user_id]);
    const event = rows[0];
    return new Events(event);
  }

  static async listAll() {
    const query = `SELECT * FROM events`;

    const { rows } = await knex.raw(query);
    return rows.map((event) => new Events(event));
  }

  static async listEventsForOrganization(organizations_id) {
    const query = `SELECT * FROM events WHERE organizations_id = ?`;

    const { rows } = await knex.raw(query, [organizations_id]);
    return rows.map((event) => new Events(event));
  }

  static async edit({ organizations_id, user_id, event, event_time, location }) {
    const query = `UPDATE events SET event = ?, event_time = ?, location = ? WHERE organizations_id = ? AND user_id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [event, event_time, location, organizations_id, user_id]);
    const event = rows[0];
    return new Events(event);
  }
}

module.exports = Events;