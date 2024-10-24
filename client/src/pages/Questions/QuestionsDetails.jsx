// QuestionsDetails.jsx
import React, { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import Upvote from '../../assets/upvote.svg';
import Downvote from '../../assets/downvote.svg';
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { deleteQuestion, postAnswer, voteQuestion, postComment } from '../../actions/question';
import DisplayComment from './DisplayComment';
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert('Login or Signup to answer a question');
      navigate('/Auth');
    } else {
      if (Answer === '') {
        alert('Enter an answer before submitting');
      } else {
        dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }));
      }
    }
  };

  const handlePostCom = (e) => {
    e.preventDefault();
    if (User === null) {
      alert('Login or Signup to answer a question');
      navigate('/Auth');
    } else {
      if (comment === '') {
        alert('Enter a comment before submitting');
      } else {
        dispatch(postComment({ id, commentBody: comment, userCommented: User.result.name, userId: User.result._id }));
        setShow(!show);
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert('Copied URL:' + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, 'upVote', User.result._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, 'downVote', User.result._id));
  };

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionReducer);
  const [Answer, setAnswer] = useState('');
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = 'http://localhost:3000';


  return (
    <div className="max-w-4xl mx-auto">
      {questionsList.data === null ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {questionsList.data
            .filter(question => question._id === id)
            .map(question => (
              <div key={question._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    {question.questionTitle}
                  </h1>
                  
                  <div className="flex gap-6">
                    {/* Voting Section */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={handleUpVote}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <img src={Upvote} alt="Upvote" className="w-8 h-8" />
                      </button>
                      <span className="text-xl font-medium my-2">
                        {question.upVote.length - question.downVote.length}
                      </span>
                      <button 
                        onClick={handleDownVote}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <img src={Downvote} alt="Downvote" className="w-8 h-8" />
                      </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="prose max-w-none">
                        <p>{question.questionBody}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {question.questionTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-6 border-t">
                        <div className="flex gap-4">
                          <button
                            onClick={handleShare}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button
                              onClick={handleDelete}
                              className="text-red-600 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            asked {moment(question.askedOn).fromNow()}
                          </span>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
                          >
                            <Avatar
                              backgroundColor="blue"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                              color="white"
                              letter={question.userPosted.charAt(0)}
                            />
                            <span className="text-sm text-gray-700">
                              {question.userPosted}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer Section */}
                <div className="border-t bg-gray-50 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Your Answer
                  </h3>
                  <form onSubmit={(e) => handlePostAns(e, question.noOfAnswers)}>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-y"
                      rows="6"
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Write your answer here..."
                    />
                    <button
                      type="submit"
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Post Your Answer
                    </button>
                  </form>
                </div>

                {/* Existing Answers */}
                <div className="border-t p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {question.noOfAnswers} Answers
                  </h3>
                  <DisplayAnswer question={question} />
                </div>

                {/* Comments Section */}
                <div className="border-t bg-gray-50 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Comments
                    </h3>
                    <button
                      onClick={() => setShow(!show)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {show ? 'Hide Comments' : 'Show Comments'}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <textarea
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-y"
                        rows="3"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                      />
                      <button
                        onClick={handlePostCom}
                        className="px-6 py-2 h-fit bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                    {show && <DisplayComment question={question} />}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
