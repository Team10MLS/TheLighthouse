const knex = require('../knex');
const Comments = require('./comments');

class Posts {
  constructor({ id, user_id, title, body }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.body = body;
  }

  static async create({ user_id, title, body }) {
    const query = `INSERT INTO posts (user_id,title,body) VALUES (?,?,?) RETURNING *`;

    const { rows } = await knex.raw(query, [user_id, title, body]);
    const post = rows[0];
    return new Posts(post);
  }

  static async update({ id, title, body }) {
    const query = `UPDATE posts SET title = ?, body = ? WHERE id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [title, body, id]);
    const post = rows[0];
    return new Posts(post);
  }

  static async delete({ id }) {
    const query = `DELETE FROM posts WHERE id = ? RETURNING *`;

    const { rows } = await knex.raw(query, [id]);
    const post = rows[0];
    return new Posts(post);
  }

  static async listAll() {
    const query = `
      SELECT posts.*, users.username, organizations.name as organization_name
      FROM posts 
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN organizations ON users.organization_id = organizations.id
    `;
  
    const { rows } = await knex.raw(query, []);
    const posts = rows.map(post => {
      const { username, organization_name, ...postFields } = post;
      const postObj = new Posts(postFields);
      postObj.username = username;
      postObj.organizationName = organization_name;
      return postObj;
    });
  
    return posts;
  }

  static async listCommentsForPost(post_id) {
    const query = `SELECT * FROM comments WHERE post_id = ?`;

    const { rows } = await knex.raw(query, [post_id]);
    return rows.map((comment) => new Comments(comment));
  }

}





module.exports = Posts;
