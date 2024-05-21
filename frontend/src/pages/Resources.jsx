import {
  createResource,
  updateResource,
  getAllResources,
  getAllResourcesByCategory,
} from "../adapters/resource-adapter";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../adapters/post-adapter";
import {
  createComment,
  listCommentsForPost,
} from "../adapters/comment-adapter";
import { useState, useEffect, useContext } from "react";
import ContributeModal from "../components/ContributeModal";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import TextCard from "../components/TextCard";
import CurrentUserContext from "../contexts/current-user-context";

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
  const [posts, setPosts] = useState([]);
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
    posts: posts.filter(
      (post) => post.title.includes(debouncedSearchTerm) || post.body.includes(debouncedSearchTerm)
    ),
    resources: resources.filter(
      (resource) => resource.name.includes(debouncedSearchTerm) || resource.description.includes(debouncedSearchTerm)
    ),
  };
  
  const handleCategoryClick = async (category) => {
    const newResources = await getAllResourcesByCategory(category);
    setResources(newResources);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };
  
    const fetchResources = async () => {
      const resources = await getAllResources();
      setResources(resources);
    };
  
    fetchPosts();
    fetchResources();
  }, []);

  const handlePostSubmit = async (postData) => {
    const newPost = await createPost(postData);
    const comments = await listCommentsForPost(newPost.id);
    setPosts((prevPosts) => [...prevPosts, { ...newPost, comments }]);
  };

  const toggleCommentBox = (id) => {
    setShowCommentBox((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const newComment = { user_id: 1, body: commentText, post_id: postId };
    const createdComment = await createComment(newComment);
    setData((prevData) => ({
      ...prevData,
      posts: prevData.posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, createdComment] } : post
      ),
    }));
    setCommentText("");
    setShowCommentBox((prev) => ({ ...prev, [postId]: false }));
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setData((prevData) => ({
        ...prevData,
        posts: prevData.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }

  };

  return (
    <div className="relative isolate bg-white">
      <div className="max-w-2xl mx-auto mt-20 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="resource-desc">
        <h2>Browse Available Resources </h2>
        <p>
          This page is a collection of resources and posts that can help you find the resources you
          need. You can filter resources by category, create posts requesting certain resources, and comment on posts.
        </p>
      </div>

      <div className="categories-container mb-6 max-w-2xl mx-auto text-lg font-semibold text-gray-900">
        {categories.map((category) => (
          <span
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="category-link cursor-pointer"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="modal-section my-6 flex justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4"></h2>
        <ContributeModal />
      </div>

      <div className="post-form-section my-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Post</h2>
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      <div className="posts-section my-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Posts</h2>
        {filteredData.posts.map((post) => (
          <TextCard
            key={post.id}
            username={post.username}
            organizationName={post.organizationName}
            title={post.title}
            body={post.body}
            isPost={true}
            postId={post.id}
            handleDelete={handleDeletePost}
            showMenu={currentUser && currentUser.id === post.user_id}
          >
            <button onClick={() => toggleCommentBox(post.id)} className="black-button mt-2 mr-2">
              Add Comment
            </button>
            {showCommentBox[post.id] && (
              <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="mt-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <button type="submit" className="black-button">
                  Submit
                </button>
              </form>
            )}
            <button onClick={() => toggleComments(post.id)} className="black-button mt-2">
              {showComments[post.id] ? "Hide Comments" : "Show Comments"}
            </button>
            {showComments[post.id] &&
              post.comments &&
              post.comments.map((comment, index) => (
                <p key={index} className="text-gray-700 mt-2">
                  {comment.body}
                </p>
              ))}
          </TextCard>
        ))}
      </div>

      <div className="resources-section my-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources</h2>
        {filteredData.resources.map((resource) => (
          <TextCard
            key={resource.id}
            title={resource.name}
            body={resource.description}
            organizationName={resource.organizationName}
          />
        ))}
      </div>
    </div>
  );
}
