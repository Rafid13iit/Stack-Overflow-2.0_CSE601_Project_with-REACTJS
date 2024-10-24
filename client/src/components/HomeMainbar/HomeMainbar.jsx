import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import QuestionList from './QuestionList';

const HomeMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();
  const questionsList = useSelector(state => state.questionReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("Login or Signup to ask a Question");
      navigate('/Auth');
    } else {
      navigate('/AskQuestion');
    }
  };

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {location.pathname === '/' ? 'Top Questions' : 'All Questions'}
          </h1>
          {questionsList.data && (
            <p className="mt-2 text-sm text-gray-600">
              {questionsList.data.length.toLocaleString()} questions
            </p>
          )}
        </div>
        <button 
          onClick={checkAuth}
          className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ask Question
        </button>
      </div>
      
      <div className="space-y-4">
        {questionsList.data === null ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 mb-4 rounded-full bg-gray-200"></div>
              <div className="text-lg text-gray-600">Loading questions...</div>
            </div>
          </div>
        ) : (
          <QuestionList questionsList={questionsList.data} />
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;