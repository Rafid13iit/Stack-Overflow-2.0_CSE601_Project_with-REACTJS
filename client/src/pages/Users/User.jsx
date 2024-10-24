// User.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';

export const User = ({ user }) => {
  return (
    <Link 
      to={`/Users/${user._id}`} 
      className='group block p-6 bg-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 transform hover:-translate-y-1'
    >
      <div className='flex flex-col items-center space-y-4'>
        <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300'>
          {user.profileImage ? (
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className='w-14 h-14 rounded-full object-cover'
            />
          ) : (
            <div className='w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center'>
              <span className='text-2xl font-bold text-white'>
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div className='text-center'>
          <h5 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
            {user.name}
          </h5>
          {user.reputation && (
            <p className='text-sm text-gray-500 mt-1'>
              {user.reputation.toLocaleString()} reputation
            </p>
          )}
        </div>
        
        {user.tags && user.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 justify-center'>
            {user.tags.slice(0, 3).map(tag => (
              <span key={tag} className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
