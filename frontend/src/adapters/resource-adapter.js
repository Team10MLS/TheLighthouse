import { fetchHandler, getPostOptions, deleteOptions } from "../utils";

const baseUrl = '/api';

export const getAllResources = async () => {
  const [resources] = await fetchHandler(`${baseUrl}/resources`);
  return resources || [];
}

export const getAllResourcesBycategory = async (category) => {
  const [resources] = await fetchHandler(`${baseUrl}/resources/category/${category}`);
  return resources || [];
}

export const createResource = async ({ organization_id, category, name, description }) => (
  fetchHandler(`${baseUrl}/resources`, getPostOptions({ organization_id, category, name, description }))
);

export const updateResource = async ({ id, category, name, description }) => (
  fetchHandler(`${baseUrl}/resources/${id}`, getPostOptions({ category, name, description }))
);