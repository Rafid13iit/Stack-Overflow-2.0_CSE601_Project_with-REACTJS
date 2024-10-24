// ProfileBio.jsx
import React from 'react';
import { Tag } from 'lucide-react';

const ProfileBio = ({ currentProfile }) => {
  return (
    <div className='space-y-8'>
      <div>
        <h4 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
          <Tag className='w-5 h-5 mr-2' />
          Tags Watched
        </h4>
        {currentProfile?.tags.length !== 0 ? (
          <div className='flex flex-wrap gap-2'>
            {currentProfile?.tags.map((tag) => (
              <span 
                key={tag}
                className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200'
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 italic'>No tags watched yet</p>
        )}
      </div>

      <div>
        <h4 className='text-xl font-semibold text-gray-900 mb-4'>About</h4>
        {currentProfile?.about ? (
          <div className='prose max-w-none text-gray-700'>
            <p className='whitespace-pre-wrap'>{currentProfile?.about}</p>
          </div>
        ) : (
          <p className='text-gray-500 italic'>No bio added yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;