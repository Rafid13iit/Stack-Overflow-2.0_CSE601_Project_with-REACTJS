import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Code, Upload, AlertCircle, FileText, Loader2 } from "lucide-react";

const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("C++");
  const [file, setFile] = useState(null);
  const [uploadOption, setUploadOption] = useState("codeSnippet");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !content ||
      (!codeSnippet && uploadOption === "codeSnippet") ||
      (!file && uploadOption === "file")
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (uploadOption === "codeSnippet") {
        formData.append("codeSnippet", codeSnippet);
        formData.append("language", language);
      } else {
        formData.append("file", file);
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      navigate("/posts");
    } catch (err) {
      setError(err.message || "An error occurred while creating the post");
    } finally {
      setLoading(false);
    }
  };

  const programmingLanguages = [
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Java", label: "Java" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Ruby", label: "Ruby" },
    { value: "Go", label: "Go" },
    { value: "Swift", label: "Swift" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                Create a New Post
              </h1>
              <p className="mt-2 text-gray-600">
                Share your question with the community
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="What's your question?"
                />
              </div>

              {/* Content Input */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="content"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Provide more details about your question..."
                />
              </div>

              {/* Upload Options */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Include Code or File
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUploadOption("codeSnippet")}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                      uploadOption === "codeSnippet"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Code
                      className={`h-6 w-6 ${
                        uploadOption === "codeSnippet"
                          ? "text-indigo-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        uploadOption === "codeSnippet"
                          ? "text-indigo-700"
                          : "text-gray-600"
                      }`}
                    >
                      Code Snippet
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadOption("file")}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                      uploadOption === "file"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FileText
                      className={`h-6 w-6 ${
                        uploadOption === "file"
                          ? "text-indigo-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        uploadOption === "file"
                          ? "text-indigo-700"
                          : "text-gray-600"
                      }`}
                    >
                      Upload File
                    </span>
                  </button>
                </div>
              </div>

              {/* Conditional Render based on Upload Option */}
              {uploadOption === "codeSnippet" ? (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Programming Language
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      {programmingLanguages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="codeSnippet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Code Snippet
                    </label>
                    <textarea
                      id="codeSnippet"
                      rows="8"
                      value={codeSnippet}
                      onChange={(e) => setCodeSnippet(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-4 font-mono text-sm bg-gray-50 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Paste your code here..."
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-indigo-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Up to 10MB</p>
                  </div>
                  {file && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Selected: {file.name}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Creating Post...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostScreen;
