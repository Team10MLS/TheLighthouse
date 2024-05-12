import { createResource, updateResource } from "../adapters/resource-adapter";
import { getAllPostsAndResources, createPost, updatePost, deletePost } from "../adapters/post-adapter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if we need to navigate to category page


export default function ResourcesPage() {
  const [data, setData] = useState({ posts: [], resources: [] });

  useEffect(() => {
    const fetchData = async () => {
      const {post: posts, resource: resources} = await getAllPostsAndResources();
      setData({ posts, resources });
    };

    fetchData();
  }
  , []);
  
  return (
    <>
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

