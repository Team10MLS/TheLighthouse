import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api';

export const getAllPostsAndResources = async () => {
  const [posts] = await fetchHandler(`${baseUrl}/posts`);
  return posts || [];
}

export const createPost = async ({ user_id, title, body }) => (
  fetchHandler(`${baseUrl}/posts`, getPostOptions({ user_id, title, body }))
);

export const updatePost = async ({ id, title, body }) => (
  fetchHandler(`${baseUrl}/posts/${id}`, getPatchOptions({ title, body }))
);

export const deletePost = async (id) => (
  fetchHandler(`${baseUrl}/posts/${id}`, deleteOptions())
);