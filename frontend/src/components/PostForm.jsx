import React, { useState, useContext } from 'react';
import { createPost } from '../adapters/post-adapter';
import CurrentUserContext from '../contexts/current-user-context';

export default function PostForm() {
    const { currentUser } = useContext(CurrentUserContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('No current user');
            return;
        }
        try {
            // Create the post
            await createPost({ user_id: currentUser.id, title, body });
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