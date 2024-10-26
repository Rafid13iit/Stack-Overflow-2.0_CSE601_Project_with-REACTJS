// Users.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import UsersList from './UsersList';

const Users = () => {
  const location = useLocation();

  return (
    <div className='flex min-h-screen bg-orange-50'>
      <LeftSidebar />
      <div className='flex-1 p-6 lg:p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>Users</h1>
              <p className='text-gray-600'>Find and connect with fellow developers</p>
            </div>
            
            <div className='mt-4 md:mt-0 relative'>
              <input
                type='text'
                placeholder='Search users...'
                className='pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            </div>
          </div>
          
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default Users;