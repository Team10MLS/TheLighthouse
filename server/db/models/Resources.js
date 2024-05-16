const knex = require('../knex');

class Resources {
  constructor({ id, organization_id, category, name, description }) {
    this.id = id;
    this.organization_id = organization_id;
    this.category = category;
    this.name = name;
    this.description = description;
  }

  static async create({ organization_id, category, name, description }) {
    const query = `INSERT INTO resources (organization_id,category,name,description) VALUES (?,?,?,?) RETURNING *`;

    const { rows } = await knex.raw(query, [organization_id, category, name, description]);
    const resource = rows[0];
    return new Resources(resource);
  }

  static async update({ id, category, name, description }) {
    const query = `UPDATE resources SET category = ?, name = ?, description = ? WHERE id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [category, name, description, id]);
    const resource = rows[0];
    return new Resources(resource);
  }

  static async delete({ id }) {
    const query = `DELETE FROM resources WHERE id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [id]);
    const resource = rows[0];
    return new Resources(resource);
  }

  static async listAll() {
    const query = `SELECT * FROM resources`;

    const { rows } = await knex.raw(query);
    return rows.map((resource) => new Resources(resource));
  }

  static async listResourcesForOrganization(organization_id) {
    const query = `SELECT * FROM resources WHERE organization_id = ?`;

    const { rows } = await knex.raw(query, [organization_id]);
    return rows.map((resource) => new Resources(resource));
  }

  static async listResourcesByCategory(category) {
    const query = `SELECT * FROM resources WHERE category = ?`;

    const { rows } = await knex.raw(query, [category]);
    return rows.map((resource) => new Resources(resource));
  }

  
}

module.exports = Resources;
