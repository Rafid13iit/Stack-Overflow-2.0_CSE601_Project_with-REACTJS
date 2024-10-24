// DisplayComment.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestioncom } from '../../actions/question';

const DisplayComment = ({ question }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleDeletee = (quecommentId) => {
    dispatch(deleteQuestioncom(id, quecommentId));
  }

  return (
    <div className="space-y-2 mt-4">
      {question.comment.map((com) => (
        <div 
          key={com._id} 
          className="flex items-start justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex-1 text-sm">
            <Link 
              to={`/Users/${com.userId}`} 
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {com.userCommented}
            </Link>
            <span className="mx-2 text-gray-700">{com.commentBody}</span>
            <span className="text-gray-500 text-xs">
              {moment(com.commentedOn).fromNow()}
            </span>
          </div>
          {User?.result?._id === com?.userId && (
            <button 
              type='button' 
              onClick={() => handleDeletee(com._id)}
              className="ml-4 text-xs text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayComment;