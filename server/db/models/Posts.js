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
    const query = `SELECT * FROM posts`;
  
    const { rows } = await knex.raw(query, []);
    const posts = rows.map((post) => new Posts(post));
  
    for (let post of posts) {
      post.comments = await this.listCommentsForPost(post.id);
    }
  
    return posts;
  }

  static async listCommentsForPost(post_id) {
    const query = `SELECT * FROM comments WHERE post_id = ?`;

    const { rows } = await knex.raw(query, [post_id]);
    return rows.map((comment) => new Comments(comment));
  }

}





module.exports = Posts;
