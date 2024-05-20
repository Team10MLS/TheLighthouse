import {
  createResource,
  updateResource,
  getAllResources,
  getAllResourcesByCategory,
} from "../adapters/resource-adapter";
import {
  getAllPostsAndResources,
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
  const {currentUser} = useContext(CurrentUserContext);
  const [data, setData] = useState({ posts: [], resources: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState({}); // Track visibility of comment boxes by post ID
  const [showComments, setShowComments] = useState({}); // Track visibility of comments by post ID

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = {
    posts: data.posts.filter(
      (post) => post.title.includes(searchTerm) || post.body.includes(searchTerm)
    ),
    resources: data.resources.filter(
      (resource) => resource.name.includes(searchTerm) || resource.description.includes(searchTerm)
    ),
  };

  const handleCategoryClick = async (category) => {
    const resources = await getAllResourcesByCategory(category);
    setData({ ...data, resources });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { post: posts, resource: resources } = await getAllPostsAndResources();
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const comments = await listCommentsForPost(post.id);
          return { ...post, comments };
        })
      );
      setData({ posts: postsWithComments, resources });
    };

    fetchData();
  }, []);

  const handlePostSubmit = async (postData) => {
    const newPost = await createPost(postData);
    const comments = await listCommentsForPost(newPost.id);
    setData((prevData) => ({
      ...prevData,
      posts: [...prevData.posts, { ...newPost, comments }],
    }));
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
    <>
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded-md p-2 mb-4 mt-20"
      />
      {categories.map((category) => (
        <button
          className="black-button m-2"
          key={category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}

      <div className="modal-section my-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contribute</h2>
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
    </>
  );
}
