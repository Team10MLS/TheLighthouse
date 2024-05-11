const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', postController.getPostsAndResources);
postRouter.post('/', postController.createPost);
postRouter.patch('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;
