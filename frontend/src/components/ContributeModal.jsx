import React, { useState, useRef } from 'react';
import { createResource } from "../adapters/resource-adapter";

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];

export default function ContributeModal() {
  const dialogRef = useRef();
  const [formFields, setFormFields] = useState({ organization_id: '', category: '', name: '', description: '' });

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
          <input type="number" name="organization_id" placeholder="Organization ID" onChange={handleFieldChange} required />
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