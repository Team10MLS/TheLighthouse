const knex = require('../knex');

class Organization {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async list() {
    const query = `SELECT * FROM organizations`;
    const { rows } = await knex.raw(query);
    return rows.map((organization) => new Organization(organization));
  }

  static async find(id) {
    const query = `SELECT * FROM organizations WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const organization = rows[0];
    return organization ? new Organization(organization) : null;
  }

  static async create(name) {
    const query = `INSERT INTO organizations (name) VALUES (?) RETURNING *`;
    const { rows } = await knex.raw(query, [name]);
    const organization = rows[0];
    return new Organization(organization);
  }

  static async update(id, name) {
    const query = `UPDATE organizations SET name = ? WHERE id = ? RETURNING *`;
    const { rows } = await knex.raw(query, [name, id]);
    const organization = rows[0];
    return new Organization(organization);
  }

  static async delete(id) {
    const query = `DELETE FROM organizations WHERE id = ? RETURNING *`;
    const { rows } = await knex.raw(query, [id]);
    const organization = rows[0];
    return new Organization(organization);
  }
}

module.exports = Organization;