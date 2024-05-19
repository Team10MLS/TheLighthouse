import { fetchHandler, getPatchOptions, getPostOptions } from "../utils";

const baseUrl = '/api';

export const createComment = async ({ user_id, body, post_id }) => (
  fetchHandler(`${baseUrl}/comments`, getPostOptions({ user_id, body, post_id }))
);

export const deleteComment = async ({ user_id, post_id }) => (
  fetchHandler(`${baseUrl}/comments/${user_id}/${post_id}`, getPatchOptions({ user_id, post_id }))
);

export const listCommentsForPost = async (post_id) => {
  const [comments] = await fetchHandler(`${baseUrl}/comments/${post_id}`);
  return comments || [];
}

export const editComment = async ({ user_id, post_id, body }) => (
  fetchHandler(`${baseUrl}/comments`, getPatchOptions({ user_id, post_id, body }))
);
