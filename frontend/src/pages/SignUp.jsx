import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import { getAllOrganizations } from "../adapters/org-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organizationId, setOrganizationId] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;


// To grab our organization names, we need to fetch them from the server
useEffect(() => {
  const fetchOrganizations = async () => {
    const orgs = await getAllOrganizations();
    setOrganizations(orgs);
  };

  fetchOrganizations();
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();
  setErrorText('');
  if (!username || !password) return setErrorText('Missing username or password');
  if (password !== passwordConfirm) return setErrorText('Passwords do not match');

  const [user, error] = await createUser({ username, password, organization_id: organizationId });
  if (error) return setErrorText(error.message);

  setCurrentUser(user);
  navigate('/');
};

const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === 'username') setUsername(value);
  if (name === 'password') setPassword(value);
  if (name === 'organization') setOrganizationId(value);
  if (name === 'passwordConfirm') setPasswordConfirm(value);
};

  return <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      <h2 id="create-heading">Create New User</h2>
      <label htmlFor="username">Username</label>
      <input
        autoComplete="off"
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        value={username}
      />

      <label htmlFor="organization">Organization</label>
      <select id="organization" name="organization">
        <option value="">Select an organization</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>{org.name}</option>
        ))}
      </select>

      <label htmlFor="password">Password</label>
      <input
        autoComplete="off"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={password}
      />

      <label htmlFor="password-confirm">Confirm Password</label>
      <input 
        autoComplete="off" 
        type="password" 
        id="password-confirm" 
        name="passwordConfirm" 
        onChange={handleChange} 
        value={passwordConfirm} 
      />

      {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

      <button type="submit">Sign Up</button>
    </form>
    {!!errorText && <p>{errorText}</p>}
    <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
  </>;
}
