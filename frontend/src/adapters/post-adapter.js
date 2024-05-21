import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = '/api';

export const getAllPosts = async () => {
  const [posts] = await fetchHandler(`${baseUrl}/posts`);
  return posts || [];
};

export const getPost = async (id) => {
  const post = await fetchHandler(`${baseUrl}/posts/${id}`);
  return post || {};
}

export const createPost = async ({ user_id, title, body }) => (
  fetchHandler(`${baseUrl}/posts`, getPostOptions({ user_id, title, body }))
);

export const updatePost = async ({ id, title, body }) => (
  fetchHandler(`${baseUrl}/posts/${id}`, getPatchOptions({ title, body }))
);

export const deletePost = async (id) => (
  fetchHandler(`${baseUrl}/posts/${id}`, deleteOptions)
);
