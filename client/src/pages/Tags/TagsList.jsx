import React from 'react';
import { Tag as TagIcon, ArrowRight } from 'lucide-react';

const TagsList = ({ tag }) => {
  const questionCount = tag.questionCount || Math.floor(Math.random() * 1000);
  const askedToday = Math.floor(Math.random() * 10);

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-200">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="w-5 h-5 text-orange-500" />
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
          <TagIcon className="w-6 h-6 text-orange-500" />
        </div>

        <div className="space-y-2">
          <h5 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
            {tag.tagName}
          </h5>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {tag.tagDesc}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-sm">
              <span className="font-medium text-gray-900">{questionCount.toLocaleString()}</span>
              <span className="text-gray-500 ml-1">questions</span>
            </div>
            
            <div className="text-sm">
              <span className="font-medium text-gray-900">{askedToday}</span>
              <span className="text-gray-500 ml-1">asked today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
    </div>
  );
};

export default TagsList;