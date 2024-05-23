import {
  createResource,
  updateResource,
  getAllResources,
  getAllResourcesByCategory,
} from "../adapters/resource-adapter";
import { useState, useEffect, useContext } from "react";
import ContributeModal from "../components/ContributeModal";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import TextCard from "../components/TextCard";


const categories = [
  "Shelters",
  "Food",
  "Clothing",
  "Medical Services",
  "Support Groups",
  "Donations & Fundraisings",
];

export default function ResourcesPage() {
  const { currentUser } = useContext(CurrentUserContext);
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState({}); // Track visibility of comment boxes by post ID
  const [showComments, setShowComments] = useState({}); // Track visibility of comments by post ID

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // To prevent the search from being triggered on every keystroke, we debounce the search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const filteredData = {
    resources: resources.filter(
      (resource) => resource.name.includes(debouncedSearchTerm) || resource.description.includes(debouncedSearchTerm)
    )
  };

  const handleCategoryClick = async (category) => {
    const newResources = await getAllResourcesByCategory(category);
    setResources(newResources);
  };

  useEffect(() => {
    const fetchResources = async () => {
      const resources = await getAllResources();
      setResources(resources);
    };

    fetchResources();
  }, []);


  return (
    <div className="relative isolate bg-white">
      <div className="search max-w-2xl mx-auto mt-20 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="resource-desc">
        <h2>Browse Available Resources</h2>
        <p>
          This page is a collection of resources and posts that can help you find the resources you
          need. You can filter resources by category.
        </p>
      </div>

      <div className="categories-container mb-6 max-w-2xl mx-auto text-lg font-semibold text-gray-900">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="category-link cursor-pointer"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="modal-section my-6 flex justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4"></h2>
        <ContributeModal />
      </div>

      <div className="resources-section my-6">
        <h2 className="text-3xl font-bold text-gray-900">Resources</h2>
        {filteredData.resources.map((resource) => (
          <div className="text-card-container">
            <TextCard
              key={resource.id}
              title={resource.name}
              body={resource.description}
              organizationName={resource.organizationName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
