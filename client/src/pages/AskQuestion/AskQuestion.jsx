import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Tag as TagIcon, Type, FileText } from 'lucide-react';
import Background from '../../assets/background.svg';
import { askQuestion } from '../../actions/question';

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!questionTitle.trim() || !questionBody.trim() || !questionTags.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(askQuestion({
        questionTitle,
        questionBody,
        questionTags,
        userPosted: User.result.name,
        userId: User?.result?._id
      }, navigate));
    } catch (error) {
      console.error('Error submitting question:', error);
    }
    setIsSubmitting(false);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(prev => prev + "\n");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Ask a Public Question
            </h1>
            <p className="mt-2 text-gray-600">
              Get help from millions of Stack Overflow 2.0 users
            </p>
          </div>

          <img 
            src={Background} 
            alt="Question Background" 
            className="w-full h-40 object-cover rounded-xl mb-8" 
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-orange-500" />
                  <label className="font-semibold text-gray-700">Title</label>
                </div>
                <p className="text-sm text-gray-600">
                  Be specific and imagine you're asking a question to another person
                </p>
                <input 
                  type="text" 
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <label className="font-semibold text-gray-700">Body</label>
                </div>
                <p className="text-sm text-gray-600">
                  Include all the information someone would need to answer your question
                </p>
                <textarea 
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                  onKeyPress={handleEnter}
                  rows="10"
                  placeholder="Describe your problem in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-orange-500" />
                  <label className="font-semibold text-gray-700">Tags</label>
                </div>
                <p className="text-sm text-gray-600">
                  Add up to 5 tags to describe what your question is about
                </p>
                <input 
                  type="text" 
                  value={questionTags}
                  onChange={(e) => setQuestionTags(e.target.value)}
                  placeholder="e.g. xml typescript react"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Review Your Question'}
              </button>
              
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="py-3 px-6 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Writing a good question</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>• Summarize your problem in a one-line title</li>
                <li>• Describe your problem in more detail</li>
                <li>• Describe what you tried and what you expected to happen</li>
                <li>• Add "tags" which help surface your question to members</li>
                <li>• Review your question and post it to the site</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;