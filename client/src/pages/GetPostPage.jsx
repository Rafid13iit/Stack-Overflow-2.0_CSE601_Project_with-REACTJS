import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetPostScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileContent, setFileContent] = useState({});
  const [snippetLoading, setSnippetLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showSnippet, setShowSnippet] = useState({});

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [userInfo, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    } catch (error) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCode = async (postId, codeSnippet) => {
    if (!showSnippet[postId]) {
      setSnippetLoading((prev) => ({ ...prev, [postId]: true }));
      try {
        const response = await fetch(codeSnippet);
        const content = await response.text();
        setFileContent((prev) => ({ ...prev, [postId]: content }));
      } catch (error) {
        console.error("Error fetching file content:", error);
      } finally {
        setSnippetLoading((prev) => ({ ...prev, [postId]: false }));
      }
    }
    setShowSnippet((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Community Posts
            </h1>
            <button
              onClick={() => navigate("/create-post")}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-sm"
            >
              Create New Post
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {post.user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2
                      className="text-xl font-semibold text-gray-900 hover:underline hover:cursor-pointer"
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {post.user?.name} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-4">{post.content}</p>

                {/* Code Snippet Section */}
                {post.codeSnippet && (
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        handleToggleCode(post._id, post.codeSnippet)
                      }
                      className="inline-flex items-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      <span>
                        {showSnippet[post._id] ? "Hide Code" : "View Code"}
                      </span>
                    </button>

                    {showSnippet[post._id] && (
                      <div className="relative">
                        {snippetLoading[post._id] ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                          </div>
                        ) : (
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">
                              {fileContent[post._id] || "No content available."}
                            </code>
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Post Footer */}
              <div className="border-t bg-gray-50 px-6 py-3">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-700 hover:text-indigo-600 text-sm font-medium flex items-center space-x-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="text-gray-700 hover:text-indigo-600 text-sm font-medium flex items-center space-x-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Comment</span>
                  </button>
                  <button className="text-gray-700 hover:text-indigo-600 text-sm font-medium flex items-center space-x-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No posts found
            </h3>
            <p className="mt-2 text-gray-500">
              Get started by creating your first post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetPostScreen;