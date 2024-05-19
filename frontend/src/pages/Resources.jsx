import { createResource, updateResource, getAllResources, getAllResourcesByCategory } from "../adapters/resource-adapter";
import { getAllPostsAndResources, createPost, updatePost, deletePost } from "../adapters/post-adapter";
import { createComment, listCommentsForPost } from "../adapters/comment-adapter";
import { useState, useEffect } from "react";
import ContributeModal from "../components/ContributeModal";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const categories = ['Shelters', 'Food', 'Clothing', 'Medical Services', 'Support Groups', 'Donations & Fundraisings'];

export default function ResourcesPage() {
  const [data, setData] = useState({ posts: [], resources: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showCommentBox, setShowCommentBox] = useState({}); // Track visibility of comment boxes by post ID

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
      // Fetch comments for each post
      const postsWithComments = await Promise.all(posts.map(async post => {
        const comments = await listCommentsForPost(post.id);
        return { ...post, comments };
      }));
      setData({ posts: postsWithComments, resources });
    };

    fetchData();
  }, []);

  const handlePostSubmit = async (postData) => {
    // Create the post
    const newPost = await createPost(postData);
    const comments = await listCommentsForPost(newPost.id);

    // Update the state to include the new post
    setData(prevData => ({
      ...prevData,
      posts: [...prevData.posts, { ...newPost, comments }]
    }));
  };

  const toggleCommentBox = (id) => {
    setShowCommentBox(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();

    const newComment = { user_id: 1, body: commentText, post_id: postId }; // Replace user_id with actual user ID
    const createdComment = await createComment(newComment);

    // Update the local state with the new comment
    setData(prevData => ({
      ...prevData,
      posts: prevData.posts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, createdComment] } : post
      )
    }));

    setCommentText('');
    setShowCommentBox(prev => ({ ...prev, [postId]: false }));
  };

  return (
    <>
      <input type="text" placeholder="search" value={searchTerm} onChange={handleSearchChange} />
      {categories.map(category => (
        <button className="black-button" key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
      ))}

      {/* Contribute Modal Section */}
      <div className="modal-section">
        <ContributeModal />
      </div>

      {/* PostForm Section */}
      <div className="post-form-section">
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      {/* Display Posts */}
      <div className="posts-section">
        <h2>Posts SECTION-----------------------------------------------------</h2>
        {filteredData.posts.map(post => (
          <div key={post.id}>
            <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => toggleCommentBox(post.id)}>Add Comment</button>
            {showCommentBox[post.id] && (
              <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                <button type="submit">Submit</button>
              </form>
            )}
            {/* Display Comments */}
            {post.comments && post.comments.map((comment, index) => (
              <p key={index}>{comment.body}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Display Resources */}
      <div className="resources-section">
        <h2>Resources SECTION-----------------------------------------------------</h2>
        {filteredData.resources.map(resource => (
          <div key={resource.id}>
            <h2 className="text-2xl font-bold text-gray-900">{resource.name}</h2>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
