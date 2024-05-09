const knex = require('../knex')

class Comments {
  constructor ({id, user_id,post_id, body}) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.body = body;
  }

  static async create({user_id,post_id,body}) {
    const query = `INSERT INTO comments (user_id,post_id,body) VALUES (?,?,?) RETURNING *`;
    
    const {rows} = await knex.raw(query,[user_id,post_id,body]);
    const comment = rows[0];
    return new Comments(comment);
  }
  
  static async delete({user_id,post_id}) {
    const query = `DELETE FROM comments WHERE user_id = ? AND post_id = ? RETURNING *`;

    const {rows } = await knex.raw(query,[user_id,post_id]);
    const comment = rows[0];
    return new Comments(comment);
  }
  
  static async listCommentsForPost(post_id) {
    const query = `SELECT * FROM comments WHERE post_id = ?`;

    const {rows} = await knex.raw(query,[post_id]);
    return rows.map((comment) => new Comments(comment));
  }

  static async edit({user_id,post_id,body}) {
    const query = `UPDATE comments SET body = ? WHERE user_id = ? AND post_id = ? RETURNING *`;

    const {rows} = await knex.raw(query,[body,user_id,post_id]);
    const comment = rows[0];
    return new Comments(comment);
  }

}

module.exports = Comments;