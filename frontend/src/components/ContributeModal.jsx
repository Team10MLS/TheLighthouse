import React, { useState, useRef, useEffect } from 'react';
import { createResource } from "../adapters/resource-adapter";
import { getAllOrganizations } from '../adapters/org-adapter';

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];

export default function ContributeModal() {
  const dialogRef = useRef();
  const [formFields, setFormFields] = useState({ organization_id: '', category: '', name: '', description: '' });
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgs = await getAllOrganizations();
      setOrganizations(orgs);
    };

    fetchOrganizations();
  }, []);

  const handleFieldChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createResource(formFields);
    dialogRef.current.close();
  };

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <button className='red-button' onClick={openDialog}>Create Resource</button>
      <dialog ref={dialogRef} className="p-0">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto m-0">
          <div className="mb-4">
            <label htmlFor="organization_id" className="block text-gray-700 font-semibold mb-2">Organization</label>
            <select
              name="organization_id"
              id="organization_id"
              onChange={handleFieldChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleFieldChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formFields.name}
              onChange={handleFieldChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={formFields.description}
              onChange={handleFieldChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeDialog}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}