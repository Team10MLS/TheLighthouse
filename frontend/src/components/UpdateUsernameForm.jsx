import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(Object.fromEntries(formData));

    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="update-heading" className="space-y-6">
      <h2 id="update-heading" className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
        Update User {currentUser.username}
      </h2>
      <div>
        <label htmlFor='username' className="block text-sm font-medium leading-6 text-gray-900">New Username</label>
        <div className="mt-2">
          <input
            type='text'
            id='username'
            name='username'
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <input type="hidden" name="id" value={currentUser.id} />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Username
        </button>
      </div>
    </form>
  );
}
