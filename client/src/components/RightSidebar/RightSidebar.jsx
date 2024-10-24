import React from 'react';
import { Newspaper, MessageSquare, Info } from 'lucide-react';

const Widget = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <Newspaper className="w-5 h-5 mr-2 text-orange-500" />
          The Overflow Blog
        </h4>
        <div className="mt-3 space-y-3">
          <div className="flex items-start hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors duration-150">
            <div className="flex-shrink-0 w-1 h-1 rounded-full bg-orange-500 mt-2 mr-3"></div>
            <p className="text-gray-700 text-sm">Gen Z doesn't understand file structures (Ep. 415)</p>
          </div>
          <div className="flex items-start hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors duration-150">
            <div className="flex-shrink-0 w-1 h-1 rounded-full bg-orange-500 mt-2 mr-3"></div>
            <p className="text-gray-700 text-sm">Column by your name: The analytics database that skips the rows</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
          Featured on Meta
        </h4>
        <div className="mt-3 space-y-3">
          {metaPosts.map((post, index) => (
            <div key={index} className="flex items-start hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors duration-150">
              <div className="flex-shrink-0 w-1 h-1 rounded-full bg-blue-500 mt-2 mr-3"></div>
              <p className="text-gray-700 text-sm">{post}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <Info className="w-5 h-5 mr-2 text-green-500" />
          Hot Meta Posts
        </h4>
        <div className="mt-3 space-y-3">
          {hotPosts.map((post, index) => (
            <div key={index} className="flex items-start hover:bg-gray-50 p-2 rounded-md -mx-2 transition-colors duration-150">
              <span className="text-green-600 font-semibold mr-2">{post.votes}</span>
              <p className="text-gray-700 text-sm">{post.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WidgetTags = () => {
  const tags = ['c', 'css', 'express', 'nodejs', 'html', 'java', 'javascript', 'mern', 'mongodb', 'reactjs', 'php', 'python', 'mysql'];

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Watched Tags</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-150 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <aside className="w-80 p-6 bg-gray-50 border-l border-gray-200">
      <Widget />
      <WidgetTags />
    </aside>
  );
};

// Data arrays for Widget component
const metaPosts = [
  "Planned maintenance scheduled for Saturday, February 19, 2022 at 2:00AM UTC...",
  "Update on the ongoing DDoS attacks and blocking Tor exit nodes",
  "New official secondary domain: stackoverflow.co"
];

const hotPosts = [
  { votes: 38, title: "Why was this spam flag declined, yet the question marked as spam?" },
  { votes: 20, title: "What is the best course of action when a user has high enough rep to..." },
  { votes: 15, title: "Is a link to the How to ask help page a useful comment?" }
];

export default RightSidebar;