import { getAllPosts, createPost, updatePost, deletePost } from "../adapters/post-adapter";
import {createComment,listCommentsForPost,} from "../adapters/comment-adapter";
import { useState, useEffect, useContext } from "react";
import PostForm from "../components/PostForm";
import TextCard from "../components/TextCard";
import CurrentUserContext from "../contexts/current-user-context";

export default function PostsPage() {
  const { currentUser } = useContext(CurrentUserContext);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState({});
  const [showComments, setShowComments] = useState({});

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
      (post) =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ),
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (postData) => {
    const newPost = await createPost({ ...postData, user_id: currentUser.id });
    setPosts([...posts, newPost]);
  }

  const toggleCommentBox = (id) => {
    setShowCommentBox((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const newComment = { user_id: currentUser.id, body: commentText, post_id: postId }; // Use currentUser.id for user_id
    const createdComment = await createComment(newComment);

    // Update the posts state with the new comment
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, createdComment] } : post
      )
    );
    setCommentText("");
    setShowCommentBox((prev) => ({ ...prev, [postId]: false }));
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleTitleChange = async (e, id, type) => {
    const newTitle = e.target.textContent;
    if (type === 'post') {
      console.log(`Updating post with id ${id} to have title ${newTitle}`);
      const postToUpdate = posts.find((post) => post.id === id);
      await updatePost({ id, title: newTitle, body: postToUpdate.body });
      // Update your local state with the updated post
      setPosts((prevPosts) => (
        prevPosts.map((post) => post.id === id ? { ...post, title: newTitle } : post)
      ));
    } else if (type === 'resource') {
      // Similar logic for resources
    }
  };

  const handleBodyChange = async (e, id, type) => {
    const newBody = e.target.textContent;
    if (type === 'post') {
      console.log(`Updating post with id ${id} to have body ${newBody}`);
      const postToUpdate = posts.find((post) => post.id === id);
      await updatePost({ id, title: postToUpdate.title, body: newBody });
      // Update your local state with the updated post
      setPosts((prevPosts) => (
        prevPosts.map((post) => post.id === id ? { ...post, body: newBody } : post)
      ));
    } else if (type === 'resource') {
      // Similar logic for resources
    }
  };

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
        <h2>Browse Posts</h2>
        <p>
          Here, users can submit posts to inquire further about the resources available on the website, or otherwise seek help for a specific issue.
        </p>
      </div>

      <div className="post-form-section my-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Post</h2>
        <PostForm onSubmit={handlePostSubmit} />
      </div>
  
      <div className="posts-section my-6">
        <h2 className="text-3xl font-bold text-gray-900">Posts</h2>
        {filteredData.posts.map((post) => (
          <div key={post.id}>
            <TextCard
              username={post.username}
              organizationName={post.organizationName}
              title={post.title}
              body={post.body}
              isPost={true}
              postId={post.id}
              handleDelete={handleDeletePost}
              handleTitleChange={handleTitleChange}
              handleBodyChange={handleBodyChange}
              showMenu={currentUser && currentUser.id === post.user_id}
            />
            <div className="comments-buttons ml-10">
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
            </div>
            {showComments[post.id] && post.comments && (
              <div className="flex flex-col">
                {post.comments.map((comment, index) => (
                  <div key={index} className="border-b border-gray-200 ml-10">
                    <p className="text-gray-700 mt-2">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
