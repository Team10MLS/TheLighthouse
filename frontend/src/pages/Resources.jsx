import { createResource, updateResource, getAllResources, getAllResourcesByCategory } from "../adapters/resource-adapter";
import { getAllPostsAndResources, createPost, updatePost, deletePost } from "../adapters/post-adapter";
import { useState, useEffect } from "react";
import ContributeModal from "../components/ContributeModal";
import { useNavigate } from "react-router-dom"; // if we need to navigate to category page
import PostForm from "../components/PostForm";

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];


export default function ResourcesPage() {
  const [data, setData] = useState({ posts: [], resources: [] });


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

  return (
    <>
      {categories.map(category => (
        <button className="black-button" key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
      ))}
      <ContributeModal />
      {/* Render the PostForm component */}
      <PostForm onSubmit={handlePostSubmit} />
      {/* Render existing posts */}
      {data.posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
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