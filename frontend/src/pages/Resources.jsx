import { createResource, updateResource, getAllResources, getAllResourcesByCategory } from "../adapters/resource-adapter";
import { getAllPostsAndResources, createPost, updatePost, deletePost, getUser } from "../adapters/post-adapter";
import { useState, useEffect } from "react";
import ContributeModal from "../components/contributeModal";
import { useNavigate } from "react-router-dom"; // if we need to navigate to category page

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];


export default function ResourcesPage() {
  const [data, setData] = useState({ posts: [], resources: [] });
  const [selectedCategory, setSelectedCategory] = useState(null)

  const fetchData = async () => {
    const { post: posts, resource: resources } = await getAllPostsAndResources();
    setData({ posts, resources });
  };

  const handleResetResources = () => {
    fetchData();
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    const resources = await getAllResourcesByCategory(category);
    setData({ ...data, resources });
  };

  useEffect(() => {
    fetchData();
  }
  , []);
  
  return (
    <>
      {categories.map(category => (
        <button className="black-button" key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
      ))}
      <ContributeModal />
      {selectedCategory && <h2> Category: {selectedCategory}</h2>}
      <button onClick={handleResetResources}>Reset Resources</button>
      {data.posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {post.user && <p>Posted by: {post.user.name}</p>} 
      
        </div>
      ))}
      {data.resources.map(resource => (
        <div key={resource.id}>
          <h2>{resource.name}</h2>
          <p>{resource.description}</p>
        </div>
      ))}
    </>
  );
}

