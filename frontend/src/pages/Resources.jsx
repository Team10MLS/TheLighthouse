import { createResource, updateResource, getAllResources, getAllResourcesByCategory } from "../adapters/resource-adapter";
import { getAllPostsAndResources, createPost, updatePost, deletePost } from "../adapters/post-adapter";
import { useState, useEffect } from "react";
import ContributeModal from "../components/ContributeModal";
import { useNavigate } from "react-router-dom"; // if we need to navigate to category page
import PostForm from "../components/PostForm";

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];


export default function ResourcesPage() {
  const [data, setData] = useState({ posts: [], resources: [] });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = {
    posts: data.posts.filter(post => post.title.includes(searchTerm) || post.body.includes(searchTerm)),
    resources: data.resources.filter(resource => resource.name.includes(searchTerm) || resource.description.includes(searchTerm))
  };


  const handleCategoryClick = async (category) => {
    const resources = await getAllResourcesByCategory(category);
    setData({ ...data, resources });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { post: posts, resource: resources } = await getAllPostsAndResources();
      setData({ posts, resources });
    };

    fetchData();
  }, []);

  const handlePostSubmit = async (postData) => {
    // Create the post
    const newPost = await createPost(postData);

    // Update the state to include the new post
    setData(prevData => ({
      ...prevData,
      posts: [...prevData.posts, newPost]
    }));
  };

  // ... other code

  return (
    <>
    <input type="text" placeholder="search" value={searchTerm} onChange={handleSearchChange}/>
      {categories.map(category => (
        <button className="black-button" key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
      ))}
      <ContributeModal />
      {/* Render the PostForm component */}
      <PostForm onSubmit={handlePostSubmit} />

      {filteredData.posts.map(post => (
        <div key={post.id}>
          <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {filteredData.resources.map(resource => (
        <div key={resource.id}>
          <h2 className="text-2xl font-bold text-gray-900">{resource.name}</h2>
          <p>{resource.description}</p>
        </div>
      ))}
    </>
  );
}