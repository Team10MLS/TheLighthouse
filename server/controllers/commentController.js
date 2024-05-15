const Comment = require('../db/models/comments');

exports.createComment = async (req, res) => {
  const { user_id, post_id, body } = req.body;

  const comment = await Comment.create({ user_id, post_id, body });

  res.send(comment);
}

exports.deleteComment = async (req, res) => {
  const { user_id, post_id } = req.params;

  const comment = await Comment.delete({ user_id, post_id });

  res.send(comment);
}

exports.listCommentsForPost = async (req, res) => {
  const { post_id } = req.params;

  const comments = await Comment.listCommentsForPost(post_id);
  res.send(comments);
}

exports.editComment = async (req, res) => {
  const { user_id, post_id, body } = req.body;

  const comment = await Comment.edit({ user_id, post_id, body });

  res.send(comment);
}
