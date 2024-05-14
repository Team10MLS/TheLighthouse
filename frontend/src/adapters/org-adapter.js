import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api';

export const createOrganization = async ({ name }) => (
  fetchHandler(`${baseUrl}/orgs`, getPostOptions({ name }))
);

export const getAllOrganizations = async () => {
  const [organizations] = await fetchHandler(`${baseUrl}/orgs`);
  return organizations || [];
};

export const getOrganization = async (id) => fetchHandler(`${baseUrl}/orgs/${id}`);

export const updateOrganization = async ({ id, name }) => (
  fetchHandler(`${baseUrl}/orgs/${id}`, getPatchOptions({ id, name }))
);