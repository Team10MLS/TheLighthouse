const knex = require('../knex');

class Comment {
    constructor({ id, postId, userId, text, timeStamp }) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.text = text;
        this.timeStamp = timeStamp;
    }

    static async create(postId, userId, text) {
        const query = `
            INSERT INTO comments (post_id, user_id, text, timestamp)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const { rows } = await knex.raw(query, [postId, userId, text]);
        const comment = rows[0];
        return new Comment(comment);
    }

    static async update(id, text) {
        const query = `
            UPDATE comments
            SET text = ?
            WHERE id = ?
            RETURNING *
        `;
        const { rows } = await knex.raw(query, [text, id]);
        const updatedComment = rows[0];
        return updatedComment ? new Comment(updatedComment) : null;
    }

    static async delete(id) {
        const query = `
            DELETE FROM comments
            WHERE id = ?
            RETURNING *
        `;
        const { rows } = await knex.raw(query, [id]);
        const deletedComment = rows[0];
        return deletedComment ? new Comment(deletedComment) : null;
    }
}

module.exports = Comment;