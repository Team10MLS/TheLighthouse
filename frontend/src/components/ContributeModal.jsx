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
      <button className='red-button' onClick={openDialog}>Contribute</button>
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <select name="organization_id" onChange={handleFieldChange} required>
            <option value="">Select an organization</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
          <select name="category" onChange={handleFieldChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input type="text" name="name" placeholder="Name" onChange={handleFieldChange} required />
          <textarea name="description" placeholder="Description" onChange={handleFieldChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeDialog}>Close</button>
        </form>
      </dialog>
    </>
  );
}