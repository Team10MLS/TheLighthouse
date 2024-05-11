const Posts = require('../db/models/Posts');
const Resources = require('../db/models/Resources');

exports.getPostsAndResources = async (req, res) => {
  const post = await Posts.listAll();
  const resource = await Resources.listAll();

  res.json({ post, resource });
};

exports.createPost = async (req, res) => {
  const { user_id, title, body } = req.body;

  const post = await Posts.create({ user_id, title, body });

  res.send(post);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const post = await Posts.update({ id, title, body });

  res.send(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Posts.delete({ id });

  res.send(post);
};
