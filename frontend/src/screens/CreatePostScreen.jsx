import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const CreatePostScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [language, setLanguage] = useState('C++');
    const [file, setFile] = useState(null);
    const [uploadOption, setUploadOption] = useState('codeSnippet');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!title || !content || (!codeSnippet && uploadOption === 'codeSnippet') || (!file && uploadOption === 'file')) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            if (uploadOption === 'codeSnippet') {
                formData.append('codeSnippet', codeSnippet);
                formData.append('language', language);
            } else {
                formData.append('file', file);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('/api/posts', formData, config);
            setLoading(false);
            navigate('/posts');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while creating the post');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl transform transition-all duration-500 hover:shadow-2xl">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create a New Post</h1>
                {error && <div className="mb-4 text-red-500 text-sm text-center font-semibold">{error}</div>}
                {loading && <Loader />}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter post title"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
                        <textarea
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter post content"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Upload Option</label>
                        <div className="flex items-center mt-1 space-x-6">
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    name="uploadOption"
                                    value="codeSnippet"
                                    checked={uploadOption === 'codeSnippet'}
                                    onChange={() => setUploadOption('codeSnippet')}
                                    className="text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="ml-2">Code Snippet</span>
                            </label>
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    name="uploadOption"
                                    value="file"
                                    checked={uploadOption === 'file'}
                                    onChange={() => setUploadOption('file')}
                                    className="text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="ml-2">File Upload</span>
                            </label>
                        </div>
                    </div>

                    {uploadOption === 'codeSnippet' ? (
                        <>
                            <div>
                                <label htmlFor="codeSnippet" className="block text-sm font-semibold text-gray-600">Code Snippet</label>
                                <textarea
                                    id="codeSnippet"
                                    rows="8"
                                    value={codeSnippet}
                                    onChange={(e) => setCodeSnippet(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your code snippet"
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="language" className="block text-sm font-semibold text-gray-600">Programming Language</label>
                                <select
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                >
                                    <option value="C++">C++</option>
                                    <option value="Python">Python</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Java">Java</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label htmlFor="file" className="block text-sm font-semibold text-gray-600">Upload File</label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostScreen;
