// DisplayQuestion.jsx
import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import QuestionsDetails from './QuestionsDetails';

const DisplayQuestion = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex">
        <div className="w-64 fixed h-screen border-r border-gray-200 bg-white">
          <LeftSidebar />
        </div>
        <div className="flex-1 ml-64">
          <div className="flex">
            <main className="flex-1 px-8 py-6">
              <QuestionsDetails />
            </main>
            <aside className="w-80 hidden xl:block px-6 py-6">
              <RightSidebar />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayQuestion;