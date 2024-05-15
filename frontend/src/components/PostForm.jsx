import React, { useState } from 'react';
import { createPost } from '../adapters/post-adapter';

export default function PostForm({ userId, onPostCreated }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create the post
            const newPost = await createPost({ user_id: userId, title, body });
            // Pass the new post to the parent component
            onPostCreated(newPost);
            // Clear the form fields
            setTitle('');
            setBody('');
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            ></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
}
