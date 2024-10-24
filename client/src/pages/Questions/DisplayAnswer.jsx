// DisplayAnswer.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Avatar from '../../components/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../actions/question';
import DisplayCommentAns from './DisplayCommentAns';
import CommentAns from './CommentAns';

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showcomment, setshowcomment] = useState('');

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  }

  const handleComment = () => {
    setshowcomment(!showcomment);
  }

  return (
    <div className="space-y-6">
      {question.answer.map((ans) => (
        <div 
          key={ans._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="prose max-w-none">
              {ans.answerBody}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button 
                  type='button' 
                  onClick={handleShare}
                  className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                >
                  Share
                </button>
                {User?.result?._id === ans?.userId && (
                  <button 
                    type='button' 
                    onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                    className="text-red-600 hover:text-red-800 text-sm transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  answered {moment(ans.answeredOn).fromNow()}
                </span>
                <Link 
                  to={`/Users/${ans.userId}`}
                  className="flex items-center ml-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar 
                    backgroundColor="green" 
                    px="8px" 
                    py="5px"
                    className="text-white"
                  >
                    {ans.userAnswered.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {ans.userAnswered}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <DisplayCommentAns ansid={ans._id} question={question} />
            
            <div className="px-6 pb-4">
              {!showcomment && (
                <CommentAns 
                  onClick={handleComment} 
                  ansid={ans._id} 
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswer;