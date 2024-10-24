// CommentAns.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postCommentans } from '../../actions/question';

const CommentAns = ({ ansid }) => {
  const [showw, setShoww] = useState(false);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  const questionsList2 = useSelector((state) => state.questionReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handlePostComment = (e) => {
    e.preventDefault();
    if (User === null) {
      alert('Login or Signup to answer a question');
      navigate('/Auth');
    } else {
      if (comment === '') {
        alert('Enter a comment before submitting');
      } else {
        dispatch(postCommentans({ 
          id, 
          ansId: ansid, 
          commentBody: comment, 
          userCommented: User.result.name, 
          userId: User.result._id 
        }));
        setShoww(false);
        setComment('');
      }
    }
  }

  return (
    <div className="mt-2">
      {questionsList2.data && questionsList2.data
        .filter(question => question._id === id)
        .map(question => (
          <div key={question._id}>
            <button
              onClick={() => setShoww(!showw)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Add a comment
            </button>
            
            {showw && (
              <form onSubmit={handlePostComment} className="mt-3">
                <textarea
                  placeholder="Add your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShoww(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentAns;