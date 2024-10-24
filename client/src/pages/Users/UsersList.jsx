// UsersList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from './User';
import { Loader } from 'lucide-react';

const UsersList = () => {
  const users = useSelector((state) => state.usersReducer);
  const isLoading = useSelector((state) => state.isLoading); // Assuming you have a loading state

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader className='w-8 h-8 text-blue-500 animate-spin' />
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-xl text-gray-600'>No users found</h3>
        <p className='text-gray-500 mt-2'>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;