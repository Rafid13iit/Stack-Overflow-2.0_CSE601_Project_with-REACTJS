import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const GetPostScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fileContent, setFileContent] = useState({});
    const [snippetLoading, setSnippetLoading] = useState({});

    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            const fetchPosts = async () => {
                setLoading(true);
                try {
                    const { data } = await axios.get('/api/posts');
                    setPosts(data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load posts');
                    setLoading(false);
                }
            };
            fetchPosts();
        }
    }, [userInfo, navigate]);

    const [showSnippet, setShowSnippet] = useState({});

    const handleToggleCode = async (postId, codeSnippet) => {
        if (!showSnippet[postId]) {
            setSnippetLoading((prev) => ({ ...prev, [postId]: true }));
            try {
                const response = await fetch(codeSnippet);
                const content = await response.text();
                setFileContent((prev) => ({
                    ...prev,
                    [postId]: content,
                }));
            } catch (error) {
                console.error('Error fetching file content:', error);
                alert('Failed to load code snippet. Please try again.');
            } finally {
                setSnippetLoading((prev) => ({ ...prev, [postId]: false }));
            }
        }
        setShowSnippet((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">All Posts</h1>

                {loading && <Loader />}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="grid grid-cols-1 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{post.content}</p>

                            {post.codeSnippet && (
                                <>
                                    <button
                                        onClick={() => handleToggleCode(post._id, post.codeSnippet)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                                    >
                                        {showSnippet[post._id] ? 'Hide Code Snippet' : 'Show Code Snippet'}
                                    </button>

                                    {showSnippet[post._id] && (
                                        <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-auto">
                                            <code>
                                                {snippetLoading[post._id] ? 'Loading...' : fileContent[post._id] || 'No content available.'}
                                            </code>
                                        </pre>
                                    )}
                                </>
                            )}
                            <p className="text-sm text-gray-500 mt-4">Posted by: {post.user && post.user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GetPostScreen;
