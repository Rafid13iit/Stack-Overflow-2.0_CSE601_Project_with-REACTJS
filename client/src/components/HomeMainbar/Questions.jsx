import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ArrowUp, MessageSquare, User } from 'lucide-react';

const Questions = ({ question }) => {
  const voteCount = question.upVote.length - question.downVote.length;
  const voteColor = voteCount > 0 ? 'text-green-600' : voteCount < 0 ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="flex gap-6 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      {/* Stats Section */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center min-w-[80px]">
          <div className={`flex items-center ${voteColor} font-medium`}>
            <ArrowUp className="w-5 h-5 mr-1" />
            <span className="text-lg">{Math.abs(voteCount)}</span>
          </div>
          <span className="text-sm text-gray-500">votes</span>
        </div>
        
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="flex items-center text-blue-600 font-medium">
            <MessageSquare className="w-5 h-5 mr-1" />
            <span className="text-lg">{question.noOfAnswers}</span>
          </div>
          <span className="text-sm text-gray-500">answers</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <Link 
          to={`/Questions/${question._id}`}
          className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150"
        >
          {question.questionTitle}
        </Link>
        
        <p className="mt-2 text-gray-600 line-clamp-2">
          {question.questionBody}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {question.questionTags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span className="font-medium text-gray-700 mr-1">{question.userPosted}</span>
            <span className="mx-1">asked</span>
            <span>{moment(question.askedOn).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;