const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Instead, it is used by each of the User static methods to hide the hashed
  // password of users before sending user data to the client. Since #passwordHash
  // is private, only the isValidPassword instance method can access that value.
  constructor({ id, username, password_hash }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password.
  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );

  static async list() {
    const query = `SELECT * FROM users`;
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(username, password, organization_id) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await authUtils.hashPassword(password);

    console.log('hashing the password', password);
    console.log('hashed password:', passwordHash);

    const query = `INSERT INTO users (username, password_hash, organization_id)
      VALUES (?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [username, passwordHash, organization_id]);
    const user = rows[0];
    return new User(user);
  }

  // this is an instance method that we can use to update
  static async update(id, username) { // dynamic queries are easier if you add more properties
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [username, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}

module.exports = User;
