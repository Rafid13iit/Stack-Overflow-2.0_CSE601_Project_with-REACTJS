import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Code2,
  User,
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

const ViewPostScreen = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [showSnippet, setShowSnippet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [snippetLoading, setSnippetLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
      } catch (error) {
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleToggleCode = async () => {
    if (!showSnippet && post?.codeSnippet) {
      setSnippetLoading(true);
      try {
        const response = await fetch(post.codeSnippet);
        const content = await response.text();
        setFileContent(content);
      } catch (error) {
        console.error("Error fetching file content:", error);
        setError("Failed to load code snippet. Please try again.");
      } finally {
        setSnippetLoading(false);
      }
    }
    setShowSnippet((prev) => !prev);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    post && (
      <div className="pt-16 min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Post Header */}
          <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                <span>{post.user?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>
                  {post.viewCount ? post.viewCount.toLocaleString() : "0"}
                </span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="bg-white shadow-sm border-x border-gray-200 p-6">
            <div className="prose max-w-none">
              <p className="text-gray-800 text-lg leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>

          {/* Code Snippet Section */}
          {post.codeSnippet && (
            <div className="bg-white shadow-sm border-x border-gray-200 p-6">
              <div className="mb-4">
                <button
                  onClick={handleToggleCode}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  <Code2 className="h-4 w-4" />
                  <span>{showSnippet ? "Hide Code" : "View Code"}</span>
                </button>
              </div>

              {showSnippet && (
                <div className="relative">
                  {snippetLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute right-2 top-2">
                        <button
                          onClick={handleCopyCode}
                          className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-100 transition duration-200"
                          title="Copy code"
                        >
                          {copied ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm font-mono">
                          {fileContent || "No content available."}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Post Footer */}
          <div className="bg-gray-50 rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition duration-200">
                  <ThumbsUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition duration-200">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition duration-200">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewPostScreen;
