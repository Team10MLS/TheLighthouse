const Comments = require('../db/models/comments');

exports.createComment = async (req, res) => {
  const { user_id, post_id, body } = req.body;

  const comment = await Comments.create({ user_id, post_id, body });

  res.send(comment);
}

exports.deleteComment = async (req, res) => {
  const {id, user_id, post_id } = req.params;

  const comment = await Comments.delete({id, user_id, post_id });

  res.send(comment);
}

exports.listCommentsForPost = async (req, res) => {
  const { post_id } = req.params;

  const comments = await Comments.listCommentsForPost(post_id);
  res.send(comments);
}

exports.editComment = async (req, res) => {
  const { id, user_id, post_id, body } = req.body;

  const comment = await Comments.edit({ id, user_id, post_id, body });

  res.send(comment);
}
